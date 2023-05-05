import { React, useState } from "react";
import DateTimePicker from "react-datetime-picker";
function Test() {
  const [startDate, setStartDate] = useState(new Date());
  // Convert the selected date to Unix time
  const unixTime = startDate ? Math.round(startDate.getTime() / 1000) : null;

  const arrOfOrg = [
    {
      organizer: "ABC",
      startTime: unixTime,
      EndTime: 1682658625,
    },
    {
      organizer: "def",
      startTime: 1682573665,
      EndTime: 1682658625,
    },
  ];
  arrOfOrg.map((org) => {
    const intervalId = setInterval(async () => {
      const scheduledTime = org.startTime;
      const currentTimestamp = Math.floor(Date.now() / 1000);

      if (currentTimestamp >= scheduledTime) {
        //   const result = await contract.executeFunction();
        console.log("Condition Met", org.organizer);
        clearInterval(intervalId); // stop checking the timestamp once the function is called
      } else {
        console.log("Function not scheduled yet");
      }
    }, 3000);
    return org;
  });
  // check the timestamp every second
  return (
    <div
      className="relative mb-3"
      id="datepicker-disable-past"
      data-te-input-wrapper-init
    >
      <input
        type="text"
        className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        placeholder="Select a date"
      />
      <label
        for="floatingInput"
        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
      >
        Select a date
      </label>
    </div>
  );
}

export default Test;
// mATIC
// O - 0.00008629 + (0.00031926 + 0.00029357) + 0.00010312 + 0.00008204; =0.00088428
// v - 0.00026941;
//sepolia
// o- 0.00008629 + (0.00031929+0.00029359)+0.00010312+  0.00004525   = 0.00084754
// V- 0.00017711

// O- 0.00086591
// V- 0.00022326

//o=  57525+(212861 +195713)+68746+ 29818 = 564663
// v= 118075
