import { memo, MemoExoticComponent } from "react";

const defaultColor = "#BDBDBD";

export type IconProps = {
  color?: string;
  className?: string;
};

export type IconType = MemoExoticComponent<({ color, ...props }: IconProps) => JSX.Element>;

const SidebarOverview = memo(({ ...props }) => (
  <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g
      clipPath="url(#a)"
      stroke="#212121"
      className="[&_path]:stroke-gray-500"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m19 8.71-5.333-4.148a2.666 2.666 0 0 0-3.274 0L5.059 8.71a2.665 2.665 0 0 0-1.029 2.105v7.2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.2c0-.823-.38-1.6-1.03-2.105Z" />
      <path d="M16 15c-2.21 1.333-5.792 1.333-8 0" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
));
const SidebarSettings = memo(() => (
  <svg
    width="24"
    height="24"
    className="[&_path]:stroke-gray-500"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_359_1566)">
      <path
        d="M14 8C15.1046 8 16 7.10457 16 6C16 4.89543 15.1046 4 14 4C12.8954 4 12 4.89543 12 6C12 7.10457 12.8954 8 14 8Z"
        stroke="#212121"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4 6H12" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 6H20" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M8 14C9.10457 14 10 13.1046 10 12C10 10.8954 9.10457 10 8 10C6.89543 10 6 10.8954 6 12C6 13.1046 6.89543 14 8 14Z"
        stroke="#212121"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4 12H6" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 12H20" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M17 20C18.1046 20 19 19.1046 19 18C19 16.8954 18.1046 16 17 16C15.8954 16 15 16.8954 15 18C15 19.1046 15.8954 20 17 20Z"
        stroke="#212121"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4 18H15" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 18H20" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_359_1566">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
));
const Lock = memo(({ color = defaultColor, ...props }: IconProps) => (
  <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#a)" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 11H7a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2Z" />
      <path d="M12 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM8 11V7a4 4 0 0 1 8 0v4" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
));
const Settings = memo(({ color = defaultColor, ...props }: IconProps) => (
  <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#a)" stroke="#212121" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.723 1.723 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37 1 .608 2.296.07 2.572-1.065Z" />
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
));
const Logout = memo(({ color = defaultColor, ...props }: IconProps) => (
  <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#a)" stroke="#212121" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2M7 12h14m0 0-3-3m3 3-3 3" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
));
const SidebarCustomers = memo(({ color = defaultColor, ...props }: IconProps) => (
  <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#a)" stroke="#212121" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2M16 3.13a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.85" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
));
const SidebarGoals = memo(({ color = defaultColor, ...props }: IconProps) => (
  <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#a)" stroke="#212121" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
      <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
      <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
));
const Check = memo(({ color = defaultColor, ...props }: IconProps) => (
  <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#a)">
      <path d="m4.167 10 4.166 4.167 8.334-8.334" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
));
const Switcher = memo(({ color = defaultColor, ...props }: IconProps) => (
  <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#a)" stroke="#212121" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="m8 9 4-4 4 4M16 15l-4 4-4-4" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
));

const Google = memo(({ color = defaultColor, ...props }: IconProps) => (
  <svg width={25} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#a)" fillRule="evenodd" clipRule="evenodd">
      <path
        d="M24.02 12.273c0-.851-.076-1.67-.218-2.455H12.5v4.642h6.458a5.52 5.52 0 0 1-2.394 3.622v3.01h3.878c2.269-2.088 3.578-5.165 3.578-8.82Z"
        fill="#4285F4"
      />
      <path
        d="M12.5 24c3.24 0 5.956-1.075 7.942-2.907l-3.878-3.011c-1.075.72-2.45 1.145-4.064 1.145-3.125 0-5.77-2.11-6.715-4.947H1.776v3.11A11.995 11.995 0 0 0 12.5 24Z"
        fill="#34A853"
      />
      <path
        d="M5.785 14.28A7.213 7.213 0 0 1 5.41 12c0-.79.136-1.56.376-2.28V6.611H1.776A11.995 11.995 0 0 0 .5 12.001c0 1.935.464 3.768 1.276 5.388l4.01-3.109Z"
        fill="#FBBC05"
      />
      <path
        d="M12.5 4.773c1.762 0 3.344.605 4.587 1.794l3.442-3.442C18.451 1.19 15.735 0 12.5 0 7.81 0 3.75 2.69 1.776 6.61l4.01 3.11c.943-2.836 3.589-4.947 6.714-4.947Z"
        fill="#EA4335"
      />
    </g>
    <defs>
      <clipPath id="a">
        <rect x={0.5} width={24} height={24} rx={6} fill="#fff" />
      </clipPath>
    </defs>
  </svg>
));

const Facebook = memo(({ color = defaultColor, ...props }: IconProps) => (
  <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="m17.214 13.328.622-4.095h-3.89V6.577c0-1.121.542-2.214 2.284-2.214H18V.877S16.395.6 14.86.6c-3.205 0-5.298 1.962-5.298 5.512v3.121H6v4.095h3.562v9.9a13.97 13.97 0 0 0 4.384 0v-9.9h3.268Z"
      fill="#1877F2"
    />
  </svg>
));

const ChevronDown = memo(({ color = defaultColor, ...props }: IconProps) => (
  <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#a)">
      <path d="m6 9 6 6 6-6" stroke="#BDBDBD" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
));
const Close = memo(({ color = defaultColor, ...props }: IconProps) => (
  <svg width={24} height={24} fill="none" className="fill-current rounded-2xl" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#a)" stroke="#212121" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
));

const GoalsTraffic = memo(({ color = defaultColor, ...props }: IconProps) => (
  <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#a)" stroke="#212121" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 4H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1ZM7 20h10M9 16v4M15 16v4" />
      <path d="m8 12 3-3 2 2 3-3" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
));
const GoalsSell = memo(({ color = defaultColor, ...props }: IconProps) => (
  <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#a)" stroke="#212121" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12h14" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
));
const GoalsBookAppointment = memo(({ color = defaultColor, ...props }: IconProps) => (
  <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#a)" stroke="#212121" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2ZM16 3v4M8 3v4M4 11h16M10 16h4M12 14v4" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
));
const GoalsPhysicalLocation = memo(({ color = defaultColor, ...props }: IconProps) => (
  <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#a)" stroke="#212121" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M3 7v1a3 3 0 1 0 6 0V7m0 1a3 3 0 1 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3l2-4h14l2 4M5 21V10.85M19 21V10.85M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
));
const PasswordEye = memo(({ color = defaultColor, ...props }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_283_1431)">
      <path
        d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
        stroke="#212121"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 12C19.333 16.667 16 19 12 19C8 19 4.667 16.667 2 12C4.667 7.333 8 5 12 5C16 5 19.333 7.333 22 12Z"
        stroke="#212121"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_283_1431">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
));
const PasswordEyeOff = memo(({ color = defaultColor, ...props }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_283_1435)">
      <path d="M3 3L21 21" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M10.584 10.587C10.2087 10.962 9.99775 11.4707 9.99756 12.0013C9.99737 12.5318 10.2079 13.0407 10.583 13.416C10.958 13.7913 11.4667 14.0022 11.9973 14.0024C12.5278 14.0026 13.0367 13.792 13.412 13.417"
        stroke="#212121"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.363 5.365C10.2204 5.11972 11.1082 4.99684 12 5C16 5 19.333 7.333 22 12C21.222 13.361 20.388 14.524 19.497 15.488M17.357 17.349C15.726 18.449 13.942 19 12 19C8 19 4.667 16.667 2 12C3.369 9.605 4.913 7.825 6.632 6.659"
        stroke="#212121"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_283_1435">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
));
const Alert = memo(({ className = "" }: IconProps) => (
  <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#a)" stroke="#212121" className={className} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 9v2m0 4v.01M5 19h14a2 2 0 0 0 1.84-2.75L13.74 4a2 2 0 0 0-3.5 0l-7.1 12.25A2 2 0 0 0 4.89 19" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
));
const SidebarTournament = memo(({ className = "" }: IconProps) => (
  <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#a)" stroke="#212121" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5M5 14h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5M10 7h4a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-4M15 12h5" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
));

const FiChevronLeft = memo(({ color = defaultColor, ...props }: IconProps) => (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth={2}
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    height="1em"
    width="1em"
    {...props}
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
));

const FiChevronDown = memo(({ color = defaultColor, ...props }: IconProps) => (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth={2}
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    height="1em"
    width="1em"
    {...props}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
));

const FiChevronRight = memo(({ color = defaultColor, ...props }: IconProps) => (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth={2}
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    height="1em"
    width="1em"
    {...props}
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
));

const FiChevronUp = memo(({ color = defaultColor, ...props }: IconProps) => (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth={2}
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    height="1em"
    width="1em"
    {...props}
  >
    <polyline points="18 15 12 9 6 15" />
  </svg>
));

const FiChevronsUp = memo(({ color = defaultColor, ...props }: IconProps) => (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth={2}
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    height="1em"
    width="1em"
    {...props}
  >
    <polyline points="17 11 12 6 7 11" />
    <polyline points="17 18 12 13 7 18" />
  </svg>
));

const FiChevronsLeft = memo(({ color = defaultColor, ...props }: IconProps) => (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth={2}
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    height="1em"
    width="1em"
    {...props}
  >
    <polyline points="11 17 6 12 11 7" />
    <polyline points="18 17 13 12 18 7" />
  </svg>
));

const FiChevronsDown = memo(({ color = defaultColor, ...props }: IconProps) => (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth={2}
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    height="1em"
    width="1em"
    {...props}
  >
    <polyline points="7 13 12 18 17 13" />
    <polyline points="7 6 12 11 17 6" />
  </svg>
));

const FiChevronsRight = memo(({ color = defaultColor, ...props }: IconProps) => (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth={2}
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    height="1em"
    width="1em"
    {...props}
  >
    <polyline points="13 17 18 12 13 7" />
    <polyline points="6 17 11 12 6 7" />
  </svg>
));
const ArrowUp = memo(({ color = defaultColor, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 24 24"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <path d="M12 5v14M16 9l-4-4M8 9l4-4" />
  </svg>
));
const ArrowDown = memo(({ color = defaultColor, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 24 24"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <path d="M12 5v14M16 15l-4 4M8 15l4 4" />
  </svg>
));

export const Icons = {
  Lock,
  Check,
  ChevronDown,
  GoalsTraffic,
  GoalsBookAppointment,
  GoalsPhysicalLocation,
  GoalsSell,
  Close,
  Logout,
  Settings,
  PasswordEye,
  PasswordEyeOff,
  Switcher,
  Alert,
  SidebarGoals,
  SidebarSettings,
  SidebarOverview,
  SidebarCustomers,
  SidebarTournament,
  Google,
  Facebook,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiChevronUp,
  FiChevronsDown,
  FiChevronsUp,
  FiChevronsLeft,
  FiChevronsRight,
  ArrowUp,
  ArrowDown,
};

const DoubleCheck = memo(({ color = defaultColor, ...props }: IconProps) => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_279_1379)">
      <path
        d="M18.6666 32L32 45.3333L58.6666 18.6667"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.33325 32L18.6666 45.3333M31.9999 32L45.3333 18.6667"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_279_1379">
        <rect width="64" height="64" fill="white" />
      </clipPath>
    </defs>
  </svg>
));

const Upload = memo(({ color = defaultColor, ...props }: IconProps) => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_97_8906)">
      <path
        d="M10.6667 45.3333V50.6666C10.6667 52.0811 11.2287 53.4376 12.2288 54.4378C13.229 55.438 14.5856 55.9999 16.0001 55.9999H48.0001C49.4146 55.9999 50.7711 55.438 51.7713 54.4378C52.7715 53.4376 53.3334 52.0811 53.3334 50.6666V45.3333"
        stroke="#BDBDBD"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.6667 24.0001L32.0001 10.6667L45.3334 24.0001"
        stroke="#BDBDBD"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M32 10.6667V42.6667" stroke="#BDBDBD" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_97_8906">
        <rect width="64" height="64" fill="white" />
      </clipPath>
    </defs>
  </svg>
));
const TrendingUp = memo(({ color = defaultColor, ...props }: IconProps) => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_316_1553)">
      <path
        d="M12.5 70.8333L37.5 45.8333L54.1667 62.5L87.5 29.1666"
        stroke="#8BC34A"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M58.3334 29.1666H87.5V58.3333" stroke="#8BC34A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_316_1553">
        <rect width="100" height="100" fill="white" />
      </clipPath>
    </defs>
  </svg>
));

export const IconsLarge = {
  DoubleCheck,
  Upload,
  TrendingUp,
};
