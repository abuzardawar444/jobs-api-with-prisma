import { Button } from "@/components/ui/button";
import customFetch from "@/utils/customFetch";
import { useLocation } from "react-router";

const Home = () => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();

  const verifyToken = async () => {
    await customFetch.post("/auth/verify-email", {
      verificationToken: query.get("token"),
      email: query.get("email"),
    });
  };
  return (
    <div className="min-h-screen flex justify-center items-center flex-col bg-secondary">
      <div className="bg-secondary p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl  font-bold mb-4 text-center">Verify</h2>
        <Button onClick={verifyToken}>Verify</Button>
      </div>
    </div>
  );
};
export default Home;
