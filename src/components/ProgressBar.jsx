import React, { useState } from "react";
import { useSelector } from "react-redux";

function ProgressBar() {
  const value = useSelector((state) => state.progress.value);
  return (
    <div className="fixed z-[100] h-1 w-full">
      <div className="h-full bg-brand" style={{ width: `${value}%` }}></div>
    </div>
  );
}

export default ProgressBar;
