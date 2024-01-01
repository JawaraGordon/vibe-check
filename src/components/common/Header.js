import React from 'react';
import Scoreboard from './Scoreboard';

const Header = () => {
  return (
    <div className="w-full fixed top-0 flex justify-between items-center bg-white p-2">
      <div className="w-1/3 flex justify-center">
        <div className="mr-4">Settings</div>
        <div>Login/Logout</div>
      </div>
      <div className="w-1/3 flex justify-center">
        <Scoreboard />
      </div>
      <div className="w-1/3 flex justify-center">spacer</div>
    </div>
  );
};

export default Header;
