import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Verify from "./pages/Verify";
import {
  forgotPasswordAction,
  loginAction,
  registerAction,
  resetPasswordAction,
  verifyEmailAction,
} from "./utils/actions";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    action: loginAction,
  },
  {
    path: "/register",
    element: <Register />,
    action: registerAction,
  },
  {
    path: "/verify",
    element: <Verify />,
    action: verifyEmailAction,
  },
  {
    path: "/forgot",
    element: <ForgotPassword />,
    action: forgotPasswordAction,
  },
  {
    path: "/reset",
    element: <ResetPassword />,
    action: resetPasswordAction,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
