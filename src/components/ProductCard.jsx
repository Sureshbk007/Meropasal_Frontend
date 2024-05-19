import { Star } from "lucide-react";

function ProductCard({
  imgUrl,
  name,
  price,
  crossPrice,
  rating,
  ratingCount = 0,
  className,
}) {
  return (
    <div
      className={`bg-slate-50 border-2 w-32 h-32 md:w-52 md:h-80 rounded-lg overflow-hidden ${className} hover:shadow-md`}
    >
      <img src={imgUrl} className="h-52 w-full object-cover" />
      <div className="px-3 py-2 flex  flex-col gap-1">
        <div className="tracking-tight line-clamp-2 leading-tight">{name}</div>
        <div className="flex gap-2 items-center">
          <span className="text-slate-700 text-lg font-bold">Rs {price}</span>
          {crossPrice && (
            <span className="line-through text-sm opacity-60">
              Rs {crossPrice}
            </span>
          )}
        </div>
        <div className="flex items-center">
          <Star fill="orange" size={16} strokeWidth={0} />
          <span className="opacity-55 text-sm">
            {rating}/5 ({ratingCount})
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
