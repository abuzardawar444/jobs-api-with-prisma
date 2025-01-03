import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "react-router";

const ResetPassword = () => {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col bg-secondary">
      <div className="bg-secondary p-6 rounded-lg shadow-md w-96">
        <Form method="POST">
          <h2 className="text-2xl text-center font-bold">Reset Password</h2>
          <Input
            type="password"
            placeholder="Password"
            name="password"
            className="my-5"
          />
          <Button type="submit" className="w-full">
            Reset Password
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default ResetPassword;
