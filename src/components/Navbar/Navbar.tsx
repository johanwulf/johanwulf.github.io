import React, { useState } from "react";

interface NavbarProps {
  children: React.ReactNode;
}

export const Navbar = ({ children }: NavbarProps) => {
  const [showChat, setShowChat] = useState(false);

  const handleLogoClick = () => {
    if (showChat) return;
    setShowChat(true);
    setTimeout(() => {
      setShowChat(false);
    }, 1000);
  };

  return (
    <div className="navbar bg-zinc-900">
      <div className="navbar-middle">
        <button
          className="btn btn-square btn-link btn-ghost"
          onClick={() => handleLogoClick()}
        >
          <img src="/wolf.svg" className="logo" alt="Wolf logo" />
        </button>
        <div className="chat chat-start ">
          <div
            className={`chat-bubble w-20 transition-all duration-1000 ease-in-out bg-sky-600 text-white ${
              showChat ? "opacity-100" : "opacity-0"
            }`}
          >
            Woof
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};
