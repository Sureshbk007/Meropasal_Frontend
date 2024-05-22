import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className=" flex flex-col items-center justify-around gap-2 mb-8">
      <img
        src="https://cdn.dribbble.com/userupload/8726278/file/original-ab1bde6f9c74de5c8961f7fe84990cd4.gif"
        alt="page not found"
        className="h-96 mix-blend-multiply -my-16 object-cover"
      />
      <h3 className="text-3xl font-semibold text-slate-600">Page not found</h3>
      <h4 className="text-slate-500">You weren't supposed to see this</h4>
      <Link to="/" className="border-2 bg-brand text-slate-50 p-2 rounded-xl ">
        Go To Home
      </Link>
    </div>
  );
}

export default PageNotFound;
