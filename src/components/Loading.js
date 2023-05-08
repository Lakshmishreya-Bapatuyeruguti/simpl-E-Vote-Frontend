import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="relative w-24 h-12">
        <div className="absolute inset-0 border-4 border-yellow-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;
