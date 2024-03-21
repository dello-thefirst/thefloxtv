"use client";
import React, { useEffect, useRef } from "react";

const Page = () => {
  let shouldLog = useRef(true);
  useEffect(() => {
    if (shouldLog.current) {
      shouldLog.current = false;
      console.log("hello world");
    }
  });
  return <div>Hey</div>;
};

export default Page;
