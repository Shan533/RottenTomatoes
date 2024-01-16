import React, { useEffect, useState } from "react";
import { Rate, Modal, message } from "antd";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../redux/loadersSlice";
import { AddReview, UpdateReview } from "../../apis/reviews";

function ReviewForm({
  program,
  reloadData,
  showReviewForm,
  setShowReviewForm,
  selectedReview,
}) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const addReview = async () => {
    try {
      dispatch(SetLoading(true));

      let response = null;
      if (selectedReview) {
        response = await UpdateReview({
          _id: selectedReview._id,
          program: program._id,
          rating,
          comment,
        });
      } else {
        response = await AddReview({
          program: program._id,
          rating,
          comment,
        });
      }
      message.success(response.message);
      reloadData();
      setShowReviewForm(false);
      dispatch(SetLoading(false));
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (selectedReview) {
      setRating(selectedReview.rating);
      setComment(selectedReview.comment);
    }
  }, [selectedReview]);

  return (
    <Modal
      open={showReviewForm}
      onCancel={() => setShowReviewForm(false)}
      centered
      title={selectedReview ? "Update Review" : "Add Review"}
      onOk={addReview}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="flex w-full">
          <span className=" font-semibold">Program : </span>
          <span className="ml-2 font-semibold">{program?.initial}</span>
          <span className="ml-2 font-semibold"> of </span>
          <span className="ml-2 font-semibold">
            {program?.schoolOf?.initial || "School"}
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
