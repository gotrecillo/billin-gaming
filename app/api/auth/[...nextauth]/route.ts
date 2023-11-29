import NextAuth, { type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const { email, id, image, name } = user;
      const exists = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!exists) {
        await prisma.user.create({
          data: {
            email,
            id,
            image,
            name,
            godMode: process.env.GOD_ID === id,
          },
        });
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (!session.user) {
        return session;
      }
      // @ts-ignore
      session.user.id = token.id;
      // @ts-ignore
      session.user.godMode = process.env.GOD_ID === token.id;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
