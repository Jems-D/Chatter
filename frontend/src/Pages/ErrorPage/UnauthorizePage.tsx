import SVG from "../../Components/SVG/SVG";
import white from "../../assets/401 Error Unauthorized  white.svg";
import dark from "../../assets/401 Error Unauthorized dark.svg";
import { Link, Navigate, useLocation } from "react-router-dom";

const UnauthorizePage = () => {
  const location = useLocation();
  if (!location.state?.fromProtectedRoute) {
    return <Navigate to="/" replace />; //usesr will not be able to enter status pages manually
  }

  return (
    <Link to="/sign-in" replace>
      <div className="w-full h-screen grid place-items-center">
        <SVG vectorWhite={white} vectorDark={dark} statusCode={"401"} />
      </div>
    </Link>
  );
};

export default UnauthorizePage;
