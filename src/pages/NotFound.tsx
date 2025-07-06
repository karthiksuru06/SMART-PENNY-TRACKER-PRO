import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "⚠️ 404 Error: User tried to access a non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-4">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <p className="text-xl font-medium text-muted-foreground">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-block mt-4 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
        >
          ⬅️ Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
