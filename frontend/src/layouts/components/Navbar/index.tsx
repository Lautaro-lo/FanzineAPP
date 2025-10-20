import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="">
      <div className="">
        <div className="">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-4 w-auto mr-2 select-none"
            draggable="false"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
