import React, { useEffect, useState } from "react";
import { message, Rate } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SetLoading } from "../../redux/loadersSlice";
import { GetAllPrograms } from "../../apis/programs";
import { getDateFormat } from "../../helpers";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const { user } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetAllPrograms();
      setPrograms(response.data);
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
      <div className="grid grid-cols-1 sm-grid-cols-2 lg:grid-cols-4 gap-10 text-gray-600">
        {programs.map((program) => (
          <div
            key={program?._id}
            className="cursor-pointer"
            onClick={() => navigate(`/program/${program?._id}`)}
          >
            <img
              src={program?.schoolOf?.images[0] || ""}
              alt=""
              className="h-44 w-full"
            />

            <h1 className="text-xl semibold text-gray-600">
              {program?.initial}
            </h1>
            <hr />
            <div className="flex justify-between text-sm">
              <span>School</span>
              <span>{program?.schoolOf?.initial}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>School</span>
              <span>{program?.schoolOf?.rankingQS}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>DDL</span>
              <span>{getDateFormat(program?.deadline)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Rating</span>
              <Rate
                disabled
                defaultValue={program?.rating || 0}
                allowHalf
                style={{ color: "darkred" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
