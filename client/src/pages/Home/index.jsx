import React, { useEffect, useState } from "react";
import { message, Rate, Card, Col, Row, Table } from "antd";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../redux/loadersSlice";
import { GetAllPrograms } from "../../apis/programs";
import { GetAllSchools } from "../../apis/schools";
import { getDateFormat } from "../../helpers";
import { useNavigate } from "react-router-dom";
import Filters from "../../components/Filters";

function Home() {
  const [filters, setFilters] = useState({
    search: "",
    degree: "",
    country: "",
  });
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const [topSchools, setTopSchools] = useState([]);
  const [topPrograms, setTopPrograms] = useState([]);
  const dispatch = useDispatch();

  const getTopSchools = () => {
    const uniqueSchools = {};

    programs.forEach((program) => {
      const school = program.schoolOf;
      if (!uniqueSchools[school._id]) {
        uniqueSchools[school._id] = school;
      } else if (school.rankingQS < uniqueSchools[school._id].rankingQS) {
        uniqueSchools[school._id] = school;
      }
    });

    const sortedSchools = Object.values(uniqueSchools).sort(
      (a, b) => a.rankingQS - b.rankingQS
    );

    setTopSchools(sortedSchools.slice(0, 5));
  };

  const getTopPrograms = () => {
    const sortedPrograms = [...programs].sort((a, b) => b.rating - a.rating);
    setTopPrograms(sortedPrograms.slice(0, 5));
  };

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetAllPrograms(filters);
      setPrograms(response.data);
      dispatch(SetLoading(false));
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [filters.degree, filters.country]);

  useEffect(() => {
    getTopSchools();
    getTopPrograms();
  }, [programs]);

  return (
    <div className="pl-5 pr-5">
      <div id="twoCards" className="mt-5 mb-10 ">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <Card
              title="QS Ranking Award"
              headStyle={{
                backgroundColor: "#F54291",
                color: "#FFFFFF",
              }}
            >
              <Table
                dataSource={topSchools}
                columns={[
                  {
                    title: "",
                    dataIndex: "images",
                    render: (images, record) => (
                      <img
                        src={images[0]}
                        alt="School Logo"
                        style={{ width: 30, height: 30, cursor: "pointer" }}
                        onClick={() => navigate(`/school/${record._id}`)}
                      />
                    ),
                  },
                  {
                    title: "School",
                    dataIndex: "name",
                    render: (name, record) => (
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(`/school/${record._id}`)}
                      >
                        {name}
                      </span>
                    ),
                  },
                  { title: "QS Ranking", dataIndex: "rankingQS" },
                ]}
                pagination={false}
              />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Card
              title="Students' Selection Award"
              headStyle={{
                backgroundColor: "#F54291",
                color: "#FFFFFF",
              }}
            >
              <Table
                dataSource={topPrograms}
                columns={[
                  {
                    title: "",
                    dataIndex: "schoolOf",
                    render: (schoolOf, record) => (
                      <img
                        src={schoolOf.images[0]}
                        alt="School Logo"
                        style={{ width: 30, height: 30, cursor: "pointer" }}
                        onClick={() =>
                          navigate(`/school/${record.schoolOf._id}`)
                        }
                      />
                    ),
                  },
                  {
                    title: "Program",
                    dataIndex: "initial",
                    render: (text, record) => (
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(`/program/${record._id}`)}
                      >
                        {text}
                      </span>
                    ),
                  },
                  {
                    title: "Rating",
                    dataIndex: "rating",
                    render: (rating) => (
                      <Rate
                        disabled
                        defaultValue={rating || 0}
                        allowHalf
                        style={{ color: "darkred" }}
                      />
                    ),
                  },
                ]}
                pagination={false}
              />
            </Card>
          </Col>
        </Row>
      </div>
      <h1 className="text-gray-600 text-2xl">All Programs</h1>
      <Filters filters={filters} setFilters={setFilters} />
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-10 text-gray-600 pt-4">
        {programs.map((program) => (
          <div
            key={program?._id}
            className="cursor-pointer w-72"
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
