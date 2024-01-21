import React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

const Button = ({ children, onClick }: Props) => {
  return (
    <button
      className="flex px-6 h-10 items-center border border-black rounded-full"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
