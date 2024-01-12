import React from "react";

const Functions = () => {
  //...
  const getTextRange = (text: string, range: number) => {
    const words = text.split(/\s+/);
    const firstXWords = words.slice(0, 40);
    const result = firstXWords.join(" ") + "...";
    return result;
  };
  return <div>Functions</div>;
};

export default Functions;
