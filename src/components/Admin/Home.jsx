import { SquareArrowOutUpRight } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const { fullName } = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-semibold text-slate-500 text-lg">
          Good Morning, <span>{fullName}</span>
        </h1>
        <div
          className="flex gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <h3 className="uppercase font-semibold text-slate-500 text-lg">
            goto your website
          </h3>
          <SquareArrowOutUpRight strokeWidth={2} className="text-brand" />
        </div>
      </div>
    </div>
  );
}

export default Home;
