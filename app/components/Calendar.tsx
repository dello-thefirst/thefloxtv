import React from "react";
var currentDate = new Date();
var monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
var currentMonthIndex = currentDate.getMonth();
var currentMonthAbbreviation = monthNames[currentMonthIndex];
var currentDay = currentDate.getDate();
console.log("Current month: " + currentMonthAbbreviation);
console.log("Current day: " + currentDay);

function Calendar() {
  return (
    <div className="fh w-7 h-7 bg-white rounded-md overflow-hidden inline-block flex-col text-[8px] text-black sm:w-6 sm:h-6" style={{textShadow: "none"}}>
      <div className="top w-full h-2 bg-red-600 text-center center-div text-white">
        {currentMonthAbbreviation}
      </div>
      <div className="day w-full h-4 text-center center-div text-[12px] font-sans font-semibold sm:text-[9px]">
        {currentDay}
      </div>
    </div>
  );
}

export default Calendar;
