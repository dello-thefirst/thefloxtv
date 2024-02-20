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
    <div className="w-[33px] h-[33px] bg-white rounded-md overflow-hidden inline-block flex-col text-[8px] text-black">
      <div className="top w-full h-[12px] bg-red-600 text-center center-div text-white">
        {currentMonthAbbreviation}
      </div>
      <div className="day w-full h-[17px] text-center center-div text-[15px] font-sans font-semibold">
        {currentDay}
      </div>
    </div>
  );
}

export default Calendar;
