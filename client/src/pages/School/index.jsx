import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoading } from "../../redux/loadersSlice";
import { message, Rate } from "antd";

import { useNavigate, useParams } from "react-router-dom";

import { GetSchoolById } from "../../apis/schools";
import { getDateFormat } from "../../helpers";
import { GetProgramsBySchoolId } from "../../apis/programs";

function School() {
  const [school, setSchool] = useState(null);
  const [programs, setPrograms] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const handleLinkClick = (e) => {
    e.preventDefault();
    window.open(`${school?.link}`, "_blank");
  };

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
                onClick={handleLinkClick}
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
                className="cursor-pointer flex flex-col w-36"
                onClick={() => navigate(`/program/${program?._id}`)}
              >
                <img
                  src={school?.images[0] || ""}
                  alt=""
                  className="cursor-pointer w-28"
                />
                <span className="text-sm text-gray-600 mt-2">
                  {program?.initial}
                </span>
                <Rate
                  disabled
                  defaultValue={program?.rating || 0}
                  allowHalf
                  style={{ color: "darkred" }}
                  className="mt-2"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default School;
