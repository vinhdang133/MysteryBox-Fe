import * as React from "react";

const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    fill="none"
    viewBox="0 0 30 30"
    {...props}
  >
    <path
      fill="#000"
      fillRule="evenodd"
      d="M10.036 9.063a4.429 4.429 0 1 1 8.857 0 4.429 4.429 0 0 1-8.857 0m4.428-5.93a5.929 5.929 0 1 0 0 11.858 5.929 5.929 0 0 0 0-11.857M6.152 23.736c0-1.987 1.566-3.565 3.457-3.565h9.71c1.892 0 3.458 1.578 3.458 3.565v1.408H6.152zm3.457-5.065c-2.755 0-4.957 2.285-4.957 5.065v2.158c0 .414.336.75.75.75h18.125a.75.75 0 0 0 .75-.75v-2.158c0-2.78-2.202-5.065-4.958-5.065z"
      clipRule="evenodd"
    ></path>
    <path
      fill="#000"
      d="M22.777 25.143v.25h.25v-.25zm-16.625 0h-.25v.25h.25zm8.312-20.76a4.68 4.68 0 0 0-4.678 4.68h.5a4.18 4.18 0 0 1 4.178-4.18zm4.679 4.68a4.68 4.68 0 0 0-4.679-4.68v.5a4.18 4.18 0 0 1 4.179 4.18zm-4.679 4.678a4.68 4.68 0 0 0 4.679-4.678h-.5a4.18 4.18 0 0 1-4.179 4.178zM9.786 9.063a4.68 4.68 0 0 0 4.678 4.678v-.5a4.18 4.18 0 0 1-4.178-4.178zm-1 0a5.68 5.68 0 0 1 5.678-5.68v-.5a6.18 6.18 0 0 0-6.178 6.18zm5.678 5.678a5.68 5.68 0 0 1-5.678-5.678h-.5a6.18 6.18 0 0 0 6.178 6.178zm5.679-5.678a5.68 5.68 0 0 1-5.679 5.678v.5a6.18 6.18 0 0 0 6.179-6.178zm-5.679-5.68a5.68 5.68 0 0 1 5.679 5.68h.5a6.18 6.18 0 0 0-6.179-6.18zM9.61 19.92c-2.035 0-3.707 1.695-3.707 3.815h.5c0-1.855 1.46-3.315 3.207-3.315zm9.71 0H9.61v.5h9.71zm3.708 3.815c0-2.12-1.672-3.815-3.708-3.815v.5c1.748 0 3.208 1.46 3.208 3.315zm0 1.408v-1.408h-.5v1.408zm-16.875.25h16.625v-.5H6.152zm-.25-1.658v1.408h.5v-1.408zm-1 0c0-2.648 2.096-4.815 4.707-4.815v-.5c-2.9 0-5.207 2.404-5.207 5.315zm0 2.158v-2.158h-.5v2.158zm.5.5a.5.5 0 0 1-.5-.5h-.5a1 1 0 0 0 1 1zm18.125 0H5.402v.5h18.125zm.5-.5a.5.5 0 0 1-.5.5v.5a1 1 0 0 0 1-1zm0-2.158v2.158h.5v-2.158zm-4.708-4.815c2.612 0 4.708 2.167 4.708 4.815h.5c0-2.911-2.308-5.315-5.208-5.315zm-9.71 0h9.71v-.5H9.61z"
    ></path>
  </svg>
);

export default UserIcon;
