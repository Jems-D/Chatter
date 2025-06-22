import SVG from "../../Components/SVG/SVG";
import white from "../../assets/403 Error Forbidden white.svg";
import dark from "../../assets/403 Error Forbidden dark.svg";
import { Link, Navigate, useLocation } from "react-router-dom";

const Forbidden = () => {
  const location = useLocation();
  if (!location?.state?.fromProtectedRoute) {
    return <Navigate to="/" replace />; //usesr will not be able to enter status pages manually
  }
  return (
    <Link to="/sign-in" replace>
      <div className="w-full h-screen grid place-items-center">
        <SVG vectorWhite={white} vectorDark={dark} statusCode={"403"} />
      </div>
    </Link>
  );
};

export default Forbidden;
