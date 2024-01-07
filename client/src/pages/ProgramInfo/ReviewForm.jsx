import React, { useState } from "react";
import { Rate, Modal, message } from "antd";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../redux/loadersSlice";
import { AddReview } from "../../apis/reviews";

function ReviewForm({
  program,
  reloadData,
  showReviewForm,
  setShowReviewForm,
}) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const addReview = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await AddReview({
        program: program._id,
        rating,
        comment,
      });
      message.success(response.message);
      reloadData();
      setShowReviewForm(false);
      dispatch(SetLoading(false));
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  return (
    <Modal
      open={showReviewForm}
      onCancel={() => setShowReviewForm(false)}
      centered
      title="Add review"
      onOk={addReview}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="flex w-full">
          <span className=" font-semibold">Program : </span>
          <span className="ml-2 font-semibold">{program?.initial}</span>
          <span className="ml-2 font-semibold"> of </span>
          <span className="ml-2 font-semibold">
            {program?.schoolOf?.initial}
          </span>
        </div>
        <Rate
          value={rating}
          onChange={(value) => setRating(value)}
          allowHalf
          style={{ color: "orange" }}
        />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter your comment here"
          cols="30"
          rows="10"
        ></textarea>
      </div>
    </Modal>
  );
}

export default ReviewForm;
