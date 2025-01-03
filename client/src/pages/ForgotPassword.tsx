import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "react-router";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col bg-secondary">
      <div className="p-6 rounded-md w-96 shadow-md bg-secondary">
        <h2 className="text-2xl text-center font-bold">Forgot Password</h2>
        <Form method="POST">
          <Input
            type="email"
            placeholder="email"
            name="email"
            className="my-5"
          />
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </div>
  );
};
export default ForgotPassword;
