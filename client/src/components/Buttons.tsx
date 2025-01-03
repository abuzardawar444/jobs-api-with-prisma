import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Buttons = ({ to, text }: { to: string; text: string }) => {
  return (
    <div>
      <Button asChild variant="link">
        <Link className="text-sm text-primary py-2" to={to}>
          {text}
        </Link>
      </Button>
    </div>
  );
};
export default Buttons;
