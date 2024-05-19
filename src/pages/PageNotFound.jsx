import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="h-[80vh] bg-gray-200 flex justify-center items-center">
      <div className="flex justify-center items-center flex-col gap-2">
        <p>404 Page not Found</p>
        <Link to="/" className="border-2 bg-brand text-slate-50 p-2 rounded-xl">
          Go To Home
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
