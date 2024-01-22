import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoading } from "../../redux/loadersSlice";
import { message, Rate, Table } from "antd";

import { getDateTimeFormat } from "../../helpers";

import { DeleteReview, GetAllReviews } from "../../apis/reviews";
import ReviewForm from "../ProgramInfo/ReviewForm";

function Reviews() {
  const [selectedReview, setSelectedReview] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { user } = useSelector((state) => state.users);
  const [reviews, setReviews] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const reviewsResponse = await GetAllReviews({ user: user._id });
      setReviews(reviewsResponse.data);
      dispatch(SetLoading(false));
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  const deleteReview = async (review) => {
    try {
      dispatch(SetLoading(true));
      const response = await DeleteReview({
        _id: review._id,
        program: review.program._id,
      });
      message.success(response.message);
      getData();
      dispatch(SetLoading(false));
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "Program",
      dataIndex: "program",
      render: (text, record) => record.program.name,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      render: (text, record) => (
        <Rate
          disabled
          allowHalf
          value={record.rating}
          style={{ color: "darkred" }}
          className="lg:text-lg text-xs"
        />
      ),
      sorter: (a, b) => a.rating - b.rating,
    },
    {
      title: "Review",
      dataIndex: "comment",
    },
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      render: (text, record) => getDateTimeFormat(record.createdAt),
      sorter: (a, b) => a.rating - b.rating,
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-5">
            <i
              className="ri-pencil-fill"
              onClick={() => {
                setSelectedReview(record);
                setShowReviewForm(true);
              }}
            ></i>
            <i
              className="ri-delete-bin-line"
              onClick={() => {
                deleteReview(record);
              }}
            ></i>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Table dataSource={reviews} columns={columns} size="small" />
      {showReviewForm && (
        <ReviewForm
          showReviewForm={showReviewForm}
          setShowReviewForm={setShowReviewForm}
          selectedReview={selectedReview}
          reloadData={getData}
          program={selectedReview.program}
        />
      )}
    </div>
  );
}

export default Reviews;
