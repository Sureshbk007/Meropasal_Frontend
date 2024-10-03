import { Link } from "react-router-dom";
import pageNotFoundImg from "/404.gif";
function PageNotFound() {
  return (
    <div className="h-screen flex justify-center items-center bg-slate-50">
      <div className="flex flex-col items-center gap-2 my-20 ">
        <img
          src={pageNotFoundImg}
          alt="page not found"
          className="h-96 mix-blend-multiply -my-16 object-cover"
        />
        <h3 className="text-3xl font-semibold text-slate-600">
          Page not found
        </h3>
        <h4 className="text-slate-500">You weren't supposed to see this</h4>
        <Link
          to="/"
          className="border-2 bg-brand text-slate-50 p-2 rounded-xl "
        >
          Go To Home
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
