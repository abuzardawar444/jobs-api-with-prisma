import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";

const FormInput = ({
  name,
  type,
  placeholder,
}: {
  name: string;
  type: string;
  placeholder: string;
}) => {
  return (
    <div>
      <div>
        <Label htmlFor={name} className="text-sm font-medium capitalize">
          {name}
        </Label>
        <Input
          type={type}
          name={name}
          id={type}
          placeholder={placeholder}
          className="my-2"
          required
        />
      </div>
    </div>
  );
};
export default FormInput;
