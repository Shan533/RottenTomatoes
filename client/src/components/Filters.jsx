import React, { useEffect, useState } from "react";
import { GetQuickSearchFilterResults } from "../apis/filters";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

function Filters({ filters, setFilters }) {
  const [hideResults, setHideResults] = useState(false);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await GetQuickSearchFilterResults(filters);
      setResults(response.data);
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (filters.search) {
      // use debounce here
      const debounce = setTimeout(() => {
        getData();
      }, 500);

      return () => clearTimeout(debounce);
    }
  }, [filters.search]);

  return (
    <div className="mb-5 flex gap-5 items-end lg:flex-row flex-col">
      <div className="w-1/2 relative">
        <input
          type="text"
          placeholder="Search Programs/ Schools"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          onFocus={() => setHideResults(false)}
          onBlur={() => {
            setTimeout(() => {
              setHideResults(true);
            }, 200);
          }}
        />

        {/* results div */}

        {filters.search &&
          !hideResults &&
          (results?.programs?.length || results?.schools?.length) && (
            <div className="quick-search-results text-gray-600">
              {results?.programs?.length > 0 &&
                results?.programs?.map((program) => {
                  return (
                    <>
                      <div
                        key={program?._id}
                        className="flex gap-10 items-center border p-2 cursor-pointer mt-2"
                        onClick={() => navigate(`/program/${program?._id}`)}
                      >
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-600 text-md">
                            {program?.name}
                          </span>
                          <span className="text-sm text-gray-500">Program</span>
                        </div>
                      </div>
                    </>
                  );
                })}

              {results?.schools?.length > 0 &&
                results?.schools?.map((school) => {
                  return (
                    <div
                      key={school?._id}
                      className="flex gap-10 items-center border p-2 cursor-pointer mt-2"
                      onClick={() => navigate(`/school/${school?._id}`)}
                    >
                      <img
                        src={school?.images[0]}
                        alt=""
                        className="h-10 w-10"
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-600 text-md">
                          {school?.name}
                        </span>
                        <span className="text-sm text-gray-500">School</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
      </div>

      <div>
        <span className="text-sm text-gray-500">Select Degree</span>
        <select
          name="degree"
          value={filters.degree}
          onChange={(e) => setFilters({ ...filters, degree: e.target.value })}
        >
          <option value="">All</option>
          <option value="master">Master</option>
          <option value="bachelor">Bachelor</option>
        </select>
      </div>

      <div>
        <span className="text-sm text-gray-500">Select Country</span>
        <select
          name="country"
          value={filters.country}
          onChange={(e) => setFilters({ ...filters, country: e.target.value })}
        >
          <option value="">All</option>
          <option value="United States">USA</option>
          <option value="UK">UK</option>
          <option value="Australia">Australia</option>
          <option value="Italy">Italy</option>
          <option value="France">France</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
