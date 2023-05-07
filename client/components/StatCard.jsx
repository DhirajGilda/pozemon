import React from "react";

function StatCard(props) {
  return (
    <div className="flex flex-col sml:flex-row flex-auto  shadow-xl my-4 min-h-[114px] sml:min-h-[100px] justify-between items-start rounded-lg firefox:bg-opacity-60  bg-opacity-20 backdrop-filter backdrop-blur-sm  bg-white p-2 w-full">
      <div className="flex shadow-lg justify-start items-center bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-px rounded-md ml-2 -mt-[30px]">
        <div className="flex justify-center items-center bg-slate-800 p-2 rounded-md">
          {props.icon}
        </div>
      </div>
      <div className="flex justify-around mt-2 sml:mt-0 h-full items-end w-full flex-col px-2">
        <p className="text-white font-semibold text-left sml:text-right text-sm mid:text-base  w-full">
          {props.title}
        </p>
        <p className="text-white font-bold  text-xl sml:text-xl">
          {props.value}
        </p>
      </div>
    </div>
  );
}

export default StatCard;
