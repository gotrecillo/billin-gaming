type IconBulbProps = {
  className?: string;
};

export default function IconBulb(props: IconBulbProps) {
  const { className } = props;
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 47.5 47.5"
      viewBox="0 0 47.5 47.5"
      id="bulb"
    >
      <defs>
        <clipPath id="a">
          <path d="M0 38h38V0H0v38Z"></path>
        </clipPath>
      </defs>
      <g clipPath="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
        <path
          fill="#ffd983"
          d="M0 0c0-6.439-5-7.439-5-13.44 0-3.098-3.123-3.359-5.5-3.359-2.053 0-6.586.779-6.586 3.361C-17.086-7.439-22-6.439-22 0c0 6.031 5.285 10.92 11.083 10.92C-5.117 10.92 0 6.031 0 0"
          transform="translate(30 25.94)"
        ></path>
        <path
          fill="#ccd6dd"
          d="M0 0c0-.828-2.234-2.5-4.167-2.5C-6.1-2.5-8.333-.828-8.333 0c0 .828 2.233.5 4.166.5C-2.234.5 0 .828 0 0"
          transform="translate(23.167 4.5)"
        ></path>
        <path
          fill="#ffcc4d"
          d="M0 0a.999.999 0 0 1-1.414 0l-3.293-3.293L-8 0a.999.999 0 1 1-1.414-1.414l3.707-3.707v-10.586a1 1 0 1 1 2 0v10.586L0-1.414A.999.999 0 0 1 0 0"
          transform="translate(23.707 26.707)"
        ></path>
        <path
          fill="#99aab5"
          d="M0 0a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v6H0V0z"
          transform="translate(25 6)"
        ></path>
        <path
          fill="#ccd6dd"
          d="M0 0a1 1 0 0 0-.164 1.986l12.001 2a.994.994 0 0 0 1.15-.822.999.999 0 0 0-.822-1.15L.166.014A.946.946 0 0 0 0 0"
          transform="translate(12.999 5)"
        ></path>
        <path
          fill="#ccd6dd"
          d="M0 0a1 1 0 0 0-.164 1.986l12.001 2a.995.995 0 0 0 1.15-.822.999.999 0 0 0-.822-1.15L.166.014A.946.946 0 0 0 0 0"
          transform="translate(12.999 9)"
        ></path>
      </g>
    </svg>
  );
}
