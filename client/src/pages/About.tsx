import { Button } from "@/components/ui/button";
import { useDashboardContext } from "./DashboardLayout";

const About = () => {
  const context = useDashboardContext();
  if (!context) {
    return null; // or handle the null case appropriately
  }
  const { logout, user } = context;

  return (
    <div>
      {user?.username}
      <br />
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};
export default About;
