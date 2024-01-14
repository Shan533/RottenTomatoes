import React, { useEffect, useState } from "react";
import { message, Rate, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SetLoading } from "../../redux/loadersSlice";

import { GetSchoolById } from "../../apis/schools";

import { useNavigate, useParams } from "react-router-dom";
import { GetProgramsBySchoolId } from "../../apis/programs";

function School() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [school, setSchool] = useState(null);
  const [programs, setPrograms] = useState([]);

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const schoolResponse = await GetSchoolById(id);
      setSchool(schoolResponse.data);
      const programsResponse = await GetProgramsBySchoolId(id);
      setPrograms(programsResponse.data);
      dispatch(SetLoading(false));
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    school && (
      <div>
        <div id="SchoolInfo" className="flex flex-col lg:flex-row gap-10 mb-5">
          <img
            src={school?.images[0] || ""}
            alt=""
            className="w-96 lg:h-[350px] lg:w-[600px]"
          />
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold text-gray-600 w-96 mb-2">
              {school?.name}
            </h1>
            <hr />

            <div className="flex flex-col gap-1 text-gray-600 w-96 text-sm mt-5">
              <div className="flex justify-between">
                <span>{school?.initial}</span>
                <span
                  onClick={() => {
                    navigate(school?.link);
                  }}
                  className="cursor-pointer underline"
                >
                  Go to website
                </span>
              </div>

              <div className="flex justify-between">
                <span>School Type</span>
                <span className="capitalize">{school?.type} school</span>
              </div>
              <div className="flex justify-between">
                <span>Location</span>
                <span>
                  {school?.location}, {school?.country}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Year of Founded</span>
                <span>{school?.year}</span>
              </div>
              <div className="flex justify-between">
                <span>QS Ranking</span>
                <span>{school?.rankingQS} (updated at 2023)</span>
              </div>
              <div className="flex justify-between">
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>

        <div id="Programs" className="mt-5 mb-10">
          <span className="text-gray-600 font-semibold text-xl">Programs</span>
          <div className="mt-2 flex gap-10">
            {programs.map((program) => {
              return (
                <div
                  key={school?._id}
                  className="cursor-pointer flex flex-col"
                  onClick={() => navigate(`/school/${school?._id}`)}
                >
                  <img
                    src={school?.images[0] || ""}
                    alt=""
                    className="cursor-pointer w-28"
                  />
                  <span className="text-sm text-gray-600">{program?.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
  );
}

export default School;
