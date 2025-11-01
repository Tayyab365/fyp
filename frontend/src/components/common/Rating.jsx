import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ value, text }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => (
        <span key={star}>
          {value >= star ? (
            <FaStar className="text-yellow-400" />
          ) : value >= star - 0.5 ? (
            <FaStarHalfAlt className="text-yellow-400" />
          ) : (
            <FaRegStar className="text-yellow-400" />
          )}
        </span>
      ))}
      {text && (
        <span className="ml-2 text-sm text-gray-600 dark:text-[var(--text-secondary)]">
          {text}
        </span>
      )}
    </div>
  );
};

export default Rating;
