import { useState, useEffect, useCallback } from "react";
import { BuildingOfficeIcon } from "@heroicons/react/24/solid";

function Filter({ handleFilterJobs }) {
  const [provinces, setProvinces] = useState([]);
  const [workPlace, setWorkPlace] = useState("");

  const onChangValue = (e) => {
    handleFilterJobs?.(e.target.value);
  };

  useEffect(() => {
    fetch("http://192.168.1.6:5000/provinces")
      .then((response) => response.json())
      .then((data) => {
        setProvinces(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <>
      {provinces.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center gap-2">
            <BuildingOfficeIcon className="size-6" />
            <h4 className="font-semibold">WorkPlace</h4>
          </div>
          <div className="my-2 ml-0.5" onChange={onChangValue}>
            <div className="flex items-center mb-1">
              <input
                id="default-radio-1"
                type="radio"
                defaultChecked
                name="default-radio"
                className="w-4 h-4 bg-gray-100 border-gray-300 "
                value=""
              />
              <label
                htmlFor="default-radio-1"
                className="ms-2 text-sm font-medium "
              >
                All WorkPlace
              </label>
            </div>
            {provinces.map((province) => (
              <div key={province.id} className="flex items-center mb-1">
                <input
                  id={`default-radio-${province.id}`}
                  type="radio"
                  name="default-radio"
                  className="w-4 h-4 bg-gray-100 border-gray-300 "
                  value={province.name}
                />
                <label
                  htmlFor="default-radio-1"
                  className="ms-2 text-sm font-medium "
                >
                  {province.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Filter;
