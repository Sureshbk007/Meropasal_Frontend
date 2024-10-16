import { StarRating } from "../components";
import currencyFormat from "../utils/currencyFormat";

function ProductCard({ imgUrl, name, price, crossedPrice, rating, className }) {
  return (
    <div
      className={`flex flex-col w-40 lg:w-56 bg-slate-50 border-2 min-h-64 box-border lg:min-h-80 rounded-lg overflow-hidden hover:shadow-md ${className}`}
    >
      <img
        src={imgUrl}
        className="h-40 lg:h-52 w-full object-cover"
        loading="lazy"
      />
      <div className="px-2 py-1 lg:p-3 flex flex-col gap-1">
        <div className="flex flex-col gap-1">
          <span className="tracking-tight line-clamp-2 leading-tight text-sm lg:text-base">
            {name}
          </span>
          <div className="flex items-center h-4">
            {rating > 0 && (
              <>
                <StarRating size={14} rating={rating} />
                <span className="opacity-55 text-xs lg:text-sm">{rating}</span>
              </>
            )}
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-slate-700 lg:text-lg font-bold">
            {currencyFormat(price)}
          </span>
          {crossedPrice && (
            <span className="line-through text-xs lg:text-sm opacity-60">
              {currencyFormat(crossedPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
