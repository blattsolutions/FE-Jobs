import { useState, useEffect, useCallback, useLayoutEffect } from "react";
import {
  AdjustmentsHorizontalIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import "./App.css";
import Card from "./component/Card";
import RecordsBoxSearch from "./component/RecordsBoxSearch";
import Pagination from "./component/Pagination";
import { backgroundImageUrl } from "./constants/index.js";
import { NumericFormat } from "react-number-format";
import Filter from "./component/Filter";
import RangeSlider from "./component/RangeSlider.jsx";
import Loading from "./component/Loading";

function App() {
  const [openSort, setOpenSort] = useState(false);
  const [sortType, setSortType] = useState("All");
  const [searchKey, setSearchKey] = useState("");
  const [region, setRegion] = useState("");
  const [total, setTotal] = useState(0);
  const [listJob, setListJob] = useState([]);
  const [minS, setMinS] = useState(0);
  const [maxS, setMaxS] = useState(10000);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(true);
  const handleRangeSalary = (min, max) => {
    setMinS(min);
    setMaxS(max);
    setLoading(true);
    fetch(
      `${API_URL}?sort=${sortType}&search=${searchKey}&region=${region}&min_s=${min}&max_s=${max}`
    )
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setListJob(data.jobs);
        setTotal(data.total);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const onPageChange = (page) => {
    setLoading(true);
    const newCurrentPage = page - 1;
    if (page !== currentPage) {
      fetch(
        `${API_URL}?offset=${newCurrentPage}&sort=${sortType}&search=${searchKey}&region=${region}&min_s=${minS}&max_s=${maxS}`
      )
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);

          setCurrentPage(page);
          setListJob(data.jobs);
          setTotal(data.total);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  const toggleDropdown = () => {
    setOpenSort(!openSort);
  };
  const onSearch = useCallback(async (keyWord) => {
    setLoading(true);
    fetch(
      `${API_URL}?sort=${sortType}&search=${keyWord}&region=${region}&min_s=${minS}&max_s=${maxS}`
    )
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setSearchKey(keyWord);
        setListJob(data.jobs);
        setTotal(data.total);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const handleFilterJobs = (workPlace) => {
    setLoading(true);
    fetch(
      `${API_URL}?sort=${sortType}&search=${searchKey}&region=${workPlace}&min_s=${minS}&max_s=${maxS}`
    )
      .then((response) => response.json())
      .then((data) => {
        setRegion(workPlace);
        setLoading(false);
        setListJob(data.jobs);
        setTotal(data.total);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const handleSortChange = (type) => {
    setOpenSort(false);
    setLoading(true);

    if (type !== sortType) {
      setSortType(type);
      fetch(
        `${API_URL}?sort=${type}&search=${searchKey}&region=${region}&min_s=${minS}&max_s=${maxS}`
      )
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          setListJob(data.jobs);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  useEffect(() => {
    fetch(`${API_URL}`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setListJob(data.jobs);
        setTotal(data.total);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <>
      <div className="py-32 w-full relative">
        <img
          src={backgroundImageUrl}
          className="absolute inset-0 w-full h-full object-cover brightness-50 z-[-1] "
          alt="Background Image"
        />
        <RecordsBoxSearch onSearch={onSearch} />
      </div>

      <div className="mx-auto max-w-screen-xl">
        <div className="flex gap-6 p-6">
          <div className="w-1/4">
            <div className="bg-gray-100 rounded-md px-3 py-4 w-full">
              <div className="flex items-center text-xl font-semibold ">
                <AdjustmentsHorizontalIcon className="size-6 text-black" />
                <span className="mx-2">Filter</span>
              </div>
              <div className="flex items-center">
                <div className="flex flex-col items-center">
                  <Filter handleFilterJobs={handleFilterJobs} />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-2">
                    <CurrencyDollarIcon className="size-6" />
                    <h4 className="font-semibold">Salary</h4>
                  </div>
                </div>
              </div>
              <RangeSlider
                initialMin={minS}
                initialMax={maxS}
                min={0}
                max={10000}
                step={100}
                priceCap={1000}
                handleRangeSalary={handleRangeSalary}
              />
            </div>
          </div>
          <div className="w-3/4">
            <div className="bg-gray-100 flex-grow text-black rounded-md px-3 py-4 w-full">
              <div className="flex items-center">
                <h3 className="mx-2">Sort by: </h3>
                <div className="flex items-center">
                  <div className="relative">
                    <button
                      onClick={toggleDropdown}
                      className="flex items-center justify-start w-40 font-semibold text-left bg-transparent rounded-lg text-sm pt-0.5"
                    >
                      {sortType === "All" && <span>All jobs</span>}
                      {sortType === "new" && <span>Latest jobs</span>}
                      {sortType === "old" && <span>Oldest jobs</span>}
                      <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        className={`w-4 h-4 transition-transform duration-200 transform ${
                          openSort ? "rotate-180" : "rotate-0"
                        }`}
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    {openSort && (
                      <div className="absolute z-50 w-full origin-top-right transition ease-out duration-100 transform opacity-100 scale-100">
                        <div className="px-2 pt-2 pb-2 bg-white rounded-md shadow-lg dark-mode:bg-gray-700">
                          <div className="flex flex-col">
                            <a
                              onClick={() => handleSortChange("All")}
                              className="flex flex-row items-start rounded-lg bg-transparent p-2 hover:bg-gray-200 cursor-pointer text-sm"
                            >
                              <div>
                                <p className="font-semibold">All jobs</p>
                              </div>
                            </a>

                            <a
                              onClick={() => handleSortChange("new")}
                              className="flex flex-row items-start rounded-lg bg-transparent p-2 hover:bg-gray-200 cursor-pointer text-sm"
                            >
                              <div>
                                <p className="font-semibold">Latest jobs</p>
                              </div>
                            </a>

                            <a
                              onClick={() => handleSortChange("old")}
                              className="flex flex-row items-start rounded-lg bg-transparent p-2 hover:bg-gray-200 cursor-pointer text-sm"
                            >
                              <div>
                                <p className="font-semibold">Oldest jobs</p>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-full">
              {loading ? (
                <Loading />
              ) : (
                <>
                  {" "}
                  <div className="my-2">
                    Found{" "}
                    <span className="text-green-500 font-semibold">
                      {" "}
                      <NumericFormat
                        displayType={"text"}
                        value={total}
                        thousandSeparator
                      />
                    </span>{" "}
                    jobs matching your requirements.
                  </div>
                  {listJob.length > 0 &&
                    listJob.map((job) => <Card key={job.id} job={job} />)}
                  <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={total}
                    pageSize={limit}
                    onPageChange={onPageChange}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
