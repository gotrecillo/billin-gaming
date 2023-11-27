'use client';
import { Room, User } from '@prisma/client';
import { inviteUserToRoom } from '../server-actions/invite-user-to-room-action';
import IconDone from '@/components/icons/IconDone';
import IconClose from '@/components/icons/IconClose';

type UserRoomListItemProps = {
  room: Room;
  user: Pick<User, 'name' | 'email' | 'id' | 'image'>;
  invited?: boolean;
};

export default function UserRoomListItem(props: UserRoomListItemProps) {
  const { room, user, invited } = props;
  const handleInviteUserToRoom = () => {
    inviteUserToRoom({ roomId: room.id, userId: user.id, invited });
  };

  return (
    <div
      key={user.id}
      className="grid grid-cols-[1fr_30px] border-2 border-slate-700 rounded-lg bg-slate-50 p-4 break-words"
    >
      <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
      <form action={handleInviteUserToRoom} id={`invite-${user.id}`}>
        <button type="submit" className="bg-transparent">
          {invited && <IconDone className="fill-success-500 w-8 h-8" />}
          {!invited && <IconClose className="fill-danger-500 w-8 h-8" />}
        </button>
      </form>
      <p className="text-small col-span-2 text-slate-900 text-ellipsis">
        {user.email}
      </p>
    </div>
  );
}
