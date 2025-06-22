import SVG from "../../Components/SVG/SVG";
import dark from "../../assets/404 Error dark.svg";
import white from "../../assets/404 Error white.svg";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <Link to="/">
      <div className="w-full h-full grid place-items-center">
        <SVG vectorWhite={white} vectorDark={dark} statusCode="404" />
      </div>
    </Link>
  );
};

export default ErrorPage;
