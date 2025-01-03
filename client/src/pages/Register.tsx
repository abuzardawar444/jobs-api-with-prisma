import Buttons from "@/components/Buttons";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { Form } from "react-router-dom";

const Register = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary">
      <div className="gb-secondary rounded-lg shadow-lg w-full max-w-4xl flex overflow-hidden">
        {/* right side  */}
        <div className="flex-1 md:flex flex-col justify-center items-center hidden">
          <div className="relative p-4">
            <img
              src="https://cdn.pixabay.com/photo/2017/07/25/22/54/lego-2539844_1280.jpg"
              className="object-cover rounded-md"
            />
          </div>
        </div>
        {/* left side  */}
        <div className="flex-1 p-8">
          <h2 className="text-2xl font-semibold mb-4">Register</h2>
          <p className="text-sm mb-8">Please enter your details below</p>
          <Form method="POST" className="space-y-4">
            <FormInput type="text" name="username" placeholder="username" />
            <FormInput
              type="email"
              name="email"
              placeholder="email@gmail.com"
            />
            <FormInput type="password" name="password" placeholder="password" />
            <Button type="submit" className="w-full my-4">
              Submit
            </Button>
            <div className="flex justify-between items-center">
              <Buttons to="/" text="alread have an account" />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Register;
