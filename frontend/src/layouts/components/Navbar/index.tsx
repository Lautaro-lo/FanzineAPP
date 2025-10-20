import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
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
