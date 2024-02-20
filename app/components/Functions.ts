// Create a new Date object
export async function Calender() {
  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentDay = currentDate.getDate();
  currentMonth += 1;
  console.log("Current month: " + currentMonth);
  console.log("Current day: " + currentDay);

  const data = [currentDay]
  return data;
}
