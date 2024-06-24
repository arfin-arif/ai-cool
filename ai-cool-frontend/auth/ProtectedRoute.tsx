// components/ProtectedRoute.tsx

import { useEffect } from "react";
import { useRouter } from "next/router";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("aiUserData");
    const user = userData ? JSON.parse(userData) : null;

    if (!user) {
      router.push("/sign-in");
    }
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;
