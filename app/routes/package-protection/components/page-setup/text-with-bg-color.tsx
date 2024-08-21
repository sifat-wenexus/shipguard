import React from 'react';

const TextWithBgColor = ({ text }: { text: string }) => {
  return <span className="bg-blue-100 p-1 rounded">{text}</span>;
};

export default TextWithBgColor;
