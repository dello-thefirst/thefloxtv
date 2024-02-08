import React from "react";

const page = () => {
  const formControlStyle =
    "w-full h-[40px] bg-transparent border-b-gray-300 border-[1px] rounded-xl mb-[10px]";
  const formInputStyle =
    "w-full h-full border-none bg-transparent px-[10px] text-black";
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <div className="w-[330px] h-auto p-[30px] bg-white rounded-2xl shadow-2xl sm:max-w-[90%] ">
        <div className="logo text-center font-sans font-bold text-gray-700 mb-[10px]">
          THEFLOXTV
        </div>
        <form action="">
          <div className={formControlStyle}>
            <input
              className={formInputStyle}
              type="text"
              name=""
              id=""
              placeholder="Email"
            />
          </div>
          <div className={formControlStyle}>
            <input
              className={formInputStyle}
              type="password"
              name=""
              id=""
              placeholder="Password"
            />
          </div>
          <button className="w-full rounded-md h-[40px] bg-sky-600 text-white">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
