import React, { useState } from 'react';

const SwitchButton = ({ on = false, setOn }) => {
  return (
    <div
      className="flex items-center justify-center mb-1"
      onClick={() => setOn((p) => !p)}
    >
      {on ? (
        <div className="flex w-12 h-6 bg-green-500 relative drop-shadow-2xl rounded-full cursor-pointer">
          <span className="h-4 w-4 absolute top-1 left-1 bg-white rounded-full active:border-4 active:border-solid border-zinc-800 ml-6 transition-all duration-500 ease-out shadow-2xl  flex items-center justify-center"></span>
        </div>
      ) : (
        <div className="flex w-12 h-6 bg-gray-500 duration-500 relative drop-shadow-2xl rounded-full cursor-pointer">
          <span className="h-4 w-4 absolute top-1 left-1 bg-white rounded-full active:border-4 active:border-solid border-zinc-800 false transition-all duration-500 ease-out shadow-2xl  flex items-center justify-center"></span>
        </div>
      )}
    </div>
  );
};

export default SwitchButton;
