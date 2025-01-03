import { Button } from "@/components/ui/button";
import { Form } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col bg-secondary">
      <div className="bg-secondary p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl  font-bold mb-4 text-center">Verify</h2>
        <Form method="POST">
          <Button type="submit">Verify</Button>
        </Form>
      </div>
    </div>
  );
};
export default Home;
