import { StarRating } from "../components";
function ProductCard({ imgUrl, name, price, crossPrice, rating, className }) {
  return (
    <div
      className={`flex flex-col w-56 bg-slate-50 border-2 min-h-80 rounded-lg overflow-hidden hover:shadow-md ${className}`}
    >
      <img src={imgUrl} className="h-52 w-full object-cover" />
      <div className="px-3 py-2 flex flex-col gap-1">
        <div className="flex flex-col gap-1">
          <span className="tracking-tight line-clamp-2 leading-tight">
            {name}
          </span>
          <div className="flex items-center">
            <StarRating size={16} rating={3.5} />
            <span className="opacity-55 text-sm">{rating}</span>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-slate-700 text-lg font-bold">Rs {price}</span>
          {crossPrice && (
            <span className="line-through text-sm opacity-60">
              Rs {crossPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
