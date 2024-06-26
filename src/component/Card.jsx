import React, { useState, useEffect } from "react";
import {
  MapPinIcon,
  RocketLaunchIcon,
  ClockIcon,
  CurrencyEuroIcon,
} from "@heroicons/react/24/solid";
import { NumericFormat } from "react-number-format";
import moment from "moment";

const Card = ({ job }) => {
  const [timeUp] = useState(job?.time_up);
  const [timeEnd] = useState(job?.time_end);
  const [difference, setDifference] = useState("");
  const handleCalculate = () => {
    const startDate = new Date(timeUp);
    const endDate = new Date(timeEnd);

    if (isNaN(startDate) || isNaN(endDate)) {
      setDifference('Invalid date(s)');
      return;
    }

    // Calculate the difference in time, converting to whole days
    const timeDiff = Math.abs(startDate - endDate);
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    setDifference(daysDiff);
    
  };
  useEffect(()=> {
    handleCalculate()
  }, [])
  return (
    <>
      <div className="bg-gray-100 flex-grow border-l-8 border-green-500 rounded-md px-3 py-2 w-full flex gap-6 mb-2">
        <div className="basis-1/5">
          <img
            src="https://www.topcv.vn/v4/image/normal-company/logo_default.png"
            className="w-100"
            alt="Company Logo"
          />
        </div>
        <div className="basis-3/5">
          <h2 className="text-lg font-medium">{job?.title}</h2>
          <h2 className="font-normal">{job?.company}</h2>
          <div className="flex flex-col text-gray-500 text-sm pt-1 gap-2">
            <div>
              <span>Updated time: {moment(job?.time_up).format("LL")}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <MapPinIcon className="size-6 text-green-500" />
              <span>
                {job?.region}, {job?.land}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <RocketLaunchIcon className="size-6 text-green-500" />
              <span>{moment(job?.time_end).format("LL")}</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="size-6 text-green-500" />
              <span>{difference} days left to apply</span>{" "}
            </div>
          </div>
        </div>
        <div className="gap-1 grow text-end">
          <span className="text-lg font-medium text-green-500 ">
            <CurrencyEuroIcon className="size-6 text-green-500 inline-block" />
            <NumericFormat
              displayType={"text"}
              value={job?.salary}
              thousandSeparator
            />
          </span>
        </div>
      </div>
    </>
  );
};

export default Card;
