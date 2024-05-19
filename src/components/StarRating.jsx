import { Star, StarHalf } from "lucide-react";

const StarRating = ({ rating, size = 24, className }) => {
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 !== 0 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <div className={`relative ${className}`}>
      <div className="flex">
        {Array.from({ length: 5 }, () => (
          <Star fill="white" strokeWidth={0.2} size={size} />
        ))}
      </div>
      <div className="flex absolute top-0">
        {Array.from({ length: fullStars }).map((_, idx) => (
          <Star
            key={`full-${idx}`}
            strokeWidth={0.2}
            fill="yellow"
            size={size}
          />
        ))}
        {Array.from({ length: halfStars }).map((_, idx) => (
          <StarHalf
            key={`half-${idx}`}
            strokeWidth={0.2}
            fill="yellow"
            className="relative"
            size={size}
          ></StarHalf>
        ))}
        {Array.from({ length: emptyStars }).map((_, idx) => (
          <Star
            key={`empty-${idx}`}
            strokeWidth={0.2}
            fill="white"
            size={size}
          />
        ))}
      </div>
    </div>
  );
};

export default StarRating;
