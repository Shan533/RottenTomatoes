import React, { useEffect, useState } from "react";
import { message, Rate, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SetLoading } from "../../redux/loadersSlice";
import { GetProgramById } from "../../apis/programs";
import { GetAllReviews } from "../../apis/reviews";
import { getDateFormat, getDateTimeFormat } from "../../helpers";
import { useNavigate, useParams } from "react-router-dom";
import ReviewForm from "./ReviewForm";

function ProgramInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [program, setProgram] = useState();
  const { id } = useParams();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState([]);

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetProgramById(id);
      const reviewsResponse = await GetAllReviews({ program: id });
      setReviews(reviewsResponse.data);
      setProgram(response.data);
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
    program && (
      <div>
        <div id="ProgramInfo" className="flex flex-col lg:flex-row gap-10 mb-5">
          <img
            src={program?.schoolOf?.images[0] || ""}
            alt=""
            className="w-96 lg:h-[350px] lg:w-[600px]"
          />
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold text-gray-600 w-96 mb-2">
              {program?.name}
            </h1>
            <hr />

            <div className="flex flex-col gap-1 text-gray-600 w-96 text-sm mt-5">
              <div className="flex justify-between">
                <span>{program?.initial}</span>
                <span className="cursor-pointer">
                  {program?.schoolOf?.initial}
                </span>
              </div>

              <div className="flex justify-between">
                <span>DDL (2024fall)</span>
                <span>{getDateFormat(program?.deadline)}</span>
              </div>

              <div className="flex justify-between">
                <span
                  onClick={() => {
                    navigate(program?.link);
                  }}
                  className="cursor-pointer"
                >
                  Link
                </span>
              </div>

              <div className="flex justify-between">
                <span>Cost</span>
                <span>
                  {program?.currency} {program?.totalTuition} ({program?.length}{" "}
                  year){" "}
                </span>
              </div>

              <div className="flex justify-between">
                <span>STEM</span>
                <span>{program?.isSTEM}</span>
              </div>

              <div className="flex justify-between">
                <span>Language</span>
                <span>Toefl: {program?.toefl}</span>
              </div>
              <div className="flex justify-between">
                <span> </span>
                <span>IELTS: {program?.ielts}</span>
              </div>
              <div className="flex justify-between">
                <span> </span>
                <span>Other: {program?.otherTests || "Not specified"}</span>
              </div>
              <div className="flex justify-between">
                <span>GRE</span>
                <span>{program?.gre || "Not specified"}</span>
              </div>
              <div className="flex justify-between">
                <span>Portfolio</span>
                <span>{program?.portfolio || "Not specified"}</span>
              </div>
              <div className="flex justify-between">
                <span>GPA</span>
                <span>{program?.gpa || "Not specified"}</span>
              </div>
            </div>
          </div>
        </div>

        <span id="Description" className="py-5 text-gray-600 text-sm mb-10">
          {program?.description || "No comment"}
        </span>

        <div id="SchoolInfo" className="mt-5 mb-10">
          <span className="text-gray-600 font-semibold text-xl">
            School Info
          </span>
          <div className="mt-2 flex gap-10">
            <img
              src={program?.schoolOf?.images[0] || ""}
              alt=""
              className="cursor-pointer w-28"
              onClick={() => navigate(`/school/${program?.schoolOf?._id}`)}
            />

            <div className="flex flex-col  gap-1">
              <span className="text-md font-semibold text-gray-600 mb-2 cursor-pointer hover:text-pink-500">
                {program?.schoolOf?.name}
              </span>
              <div className="flex justify-between text-sm">
                <span>Location</span>
                <span>{program?.schoolOf?.location}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>QS</span>
                <span>{program?.schoolOf?.rankingQS}</span>
              </div>
            </div>
          </div>
        </div>

        <hr />
        <div className="flex justify-between items-center mt-5">
          <span className="text-xl font-semibold">
            Reviews
            <Rate
              disabled
              defaultValue={program?.rating || 0}
              allowHalf
              style={{ color: "darkred" }}
              className="ml-5 cursor-pointer"
              onClick={() => setShowReviewForm(true)}
            />
          </span>

          <Button type="default" onClick={() => setShowReviewForm(true)}>
            Add Review
          </Button>
        </div>

        <div id="show-reviews" className="mt-5 flex flex-col gap-2">
          {reviews.map((review) => {
            return (
              <div
                key={review?._id}
                className="flex justify-between border-solid border p-2 rounded-sm border-gray-300"
              >
                <div className="flex flex-col">
                  <span className="text-gray-600 font-semibold text-md">
                    {review?.user?.name}
                  </span>
                  <Rate
                    disabled
                    defaultValue={review?.rating || 0}
                    allowHalf
                    style={{ color: "darkred" }}
                    className="mt-2"
                  />
                  <span className="text-gray-600 text-sm">
                    {review?.comment}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-gray-600 text-sm">
                    {getDateTimeFormat(review?.createdAt)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {showReviewForm && (
          <ReviewForm
            program={program}
            reloadData={getData}
            showReviewForm={showReviewForm}
            setShowReviewForm={setShowReviewForm}
          />
        )}
      </div>
    )
  );
}

export default ProgramInfo;
