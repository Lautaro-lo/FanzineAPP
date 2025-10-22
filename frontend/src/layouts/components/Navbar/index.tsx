import React from 'react';

const Navbar: React.FC = () => {
  return (
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
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
