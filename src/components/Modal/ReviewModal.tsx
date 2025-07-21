import { Box, Dialog, Stack } from "@mui/material";
import { X } from "lucide-react";
import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { Button } from "components/Button/Button";
import { Review } from "types/review";
import courseService from "services/course.service";
export default function ReviewModal({
  courseId,
  handleCloseModal,
  review,
  onSave = () => {},
}: {
  handleCloseModal: () => void;
  review?: Review | null;
  courseId: number;
  onSave?: () => void;
}) {
  const [rating, setRating] = useState(review ? review.rating : 0);
  const [hover, setHover] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [reviewContent, setReviewContent] = useState(
    review && review.review ? review.review : ""
  );
  const handleClose = () => {
    handleCloseModal();
  };
  const textDisplay = useMemo(() => {
    if (rating !== 0) {
      if (rating === 1) return "Rất tệ, hoàn toàn không như tôi mong đợi";
      if (rating === 2) return "Kém, khá thất vọng";
      if (rating === 3) return "Trung bình, lẽ ra có thể hay hơn";
      if (rating === 4) return "Tốt, như tôi mong đợi";
      if (rating === 5) return "Tuyệt vời, trên cả mong đợi!";
    }
    if (hover === 0) return "Chọn đánh giá";
    if (hover === 1) return "Rất tệ, hoàn toàn không như tôi mong đợi";
    if (hover === 2) return "Kém, khá thất vọng";
    if (hover === 3) return "Trung bình, lẽ ra có thể hay hơn";
    if (hover === 4) return "Tốt, như tôi mong đợi";
    if (hover === 5) return "Tuyệt vời, trên cả mong đợi!";
  }, [hover, rating]);

  const handleSave = () => {
    setIsDisabled(true);
    if (review) {
      courseService
        .updateReview(review.reviewId, rating, reviewContent.trim())
        .then(() => {
          setIsDisabled(false);
          handleClose();
          onSave();
        })
        .catch((err) => {
          console.error(err);
        });
      return;
    } else {
      courseService
        .createReview(courseId, rating, reviewContent.trim())
        .then(() => {
          setIsDisabled(false);
          handleClose();
          onSave();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <Box
        sx={{
          width: 600,
          bgcolor: "background.paper",
          borderRadius: 2,
          p: 4,
          boxShadow: 24,
        }}
      >
        <Stack className="w-full">
          <div className="flex justify-end">
            <div
              className="cursor-pointer text-gray-700 p-2 hover:bg-indigo-50 rounded-sm"
              onClick={handleClose}
            >
              <X size={18} />
            </div>
          </div>
          <Stack className="gap-y-8">
            <Stack className="gap-y-3 text-center">
              <div className="font-bold text-2xl">
                Bạn sẽ xếp hạng khóa học này ở mức nào?
              </div>
              <div className="font-medium text-lg">{textDisplay}</div>

              <div className="flex justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                    className="focus:outline-none"
                  >
                    <FontAwesomeIcon
                      icon={star <= (hover || rating) ? solidStar : regularStar}
                      size="2x"
                      className={`px-2 text-yellow-500`}
                    />
                  </button>
                ))}
              </div>
            </Stack>
            {rating > 0 && (
              <>
                <textarea
                  rows={4}
                  placeholder="Hãy cho chúng tôi biết trải nghiệm cá nhân của riêng bạn khi tham gia khóa học này. Khóa học có phù hợp với bạn không?"
                  className="text-sm w-full px-4 py-2 placeholder:text-slate-700 border border-gray-300 rounded hover:bg-gray-100 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none overflow-y-auto"
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                />
                <div className="flex justify-end">
                  <Button
                    variant="filled"
                    size="lg"
                    onClick={handleSave}
                    disabled={isDisabled}
                  >
                    Lưu và tiếp tục
                  </Button>
                </div>
              </>
            )}
          </Stack>
        </Stack>
      </Box>
    </Dialog>
  );
}
