import Layout from "@/components/Layout";
import Main from "./Main";
import ProtectedRoute from "auth/ProtectedRoute";

const HomePage = () => {
  return (
    <ProtectedRoute>
      <Layout>
        <Main />
      </Layout>
    </ProtectedRoute>
  );
};

export default HomePage;
