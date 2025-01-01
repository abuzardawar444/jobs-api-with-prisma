import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import ResetPassword from "./pages/ResetPassword";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/reset",
    element: <ResetPassword />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
