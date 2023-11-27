type IconPooProps = {
  className?: string;
};

export default function IconPoo(props: IconPooProps) {
  const { className } = props;
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 1"
      viewBox="0 0 128 128"
      id="pile-of-poo"
    >
      <path
        fill="#a04d42"
        d="M58.35 28.68c-11.68.64-16.89 6.07-16.89 12.14s3.65 8.16 8.16 8.16h27.13c13.59-.08 18.8-26.47 7.15-33.82.42 14.43-13.4 12.86-25.55 13.52zM87.89 68.69h-47.77c-14.69 0-26.6 13.5-26.6 26.88h0c0 7.98 7.46 12.82 15.86 14.45s19.87 2.77 34.63 2.82c14.75-.05 26.22-1.18 34.63-2.82s15.86-6.47 15.86-14.45h0c0-13.38-11.91-26.88-26.6-26.88z"
      ></path>
      <rect
        width="76.74"
        height="42.47"
        x="25.63"
        y="42.49"
        fill="#a04d42"
        rx="21.23"
        ry="21.23"
      ></rect>
      <rect
        width="23.84"
        height="23.84"
        x="71.15"
        y="50.06"
        fill="#fff"
        rx="11.92"
        ry="11.92"
      ></rect>
      <rect
        width="14.3"
        height="14.3"
        x="75.92"
        y="54.83"
        fill="#3a3a3a"
        rx="7.15"
        ry="7.15"
      ></rect>
      <rect
        width="23.84"
        height="23.84"
        x="33.01"
        y="50.06"
        fill="#fff"
        rx="11.92"
        ry="11.92"
      ></rect>
      <rect
        width="14.3"
        height="14.3"
        x="37.78"
        y="54.83"
        fill="#3a3a3a"
        rx="7.15"
        ry="7.15"
      ></rect>
      <path
        fill="#3a3a3a"
        d="m64,96.25c7.83,0,14.43-5.29,16.41-12.5.63-2.28-1.14-4.52-3.51-4.52h-25.81c-2.37,0-4.14,2.24-3.51,4.52,1.98,7.2,8.58,12.5,16.41,12.5Z"
      ></path>
      <rect width="128" height="128" fill="none"></rect>
    </svg>
  );
}
