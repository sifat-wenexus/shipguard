import React from 'react';

const Header = ({text}:{text:string}) => {
  return (
    <h2 className="text-green-600 font-bold text-2xl sm:text-4xl mb-6 ">
      {text}
    </h2>
  );
};

export default Header;
