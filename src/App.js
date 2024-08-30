import { RouterProvider, Navigate, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/AuthHttp";

import "../src/layouts/authentication/sign-in.css";
import Dashboard from "./layouts/dashBoard/dashboard.jsx";
import SignIn from "layouts/authentication/sign-in";
import StartPage from "layouts/startPage/StartPage";
import Profile from "layouts/Profile/Profile.jsx";
import "./index.css";
import Home from "layouts/Home/Home";

import { ThemeProvider } from "@mui/material/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Settings from "layouts/Settings/Settings";
import Expos from "layouts/Expos/Expos";
import ExpoDetails from "layouts/ExpoDetails/ExpoDetails";
import Details from "layouts/ExpoDetails/Details/Details";
import Sections from "layouts/ExpoDetails/sections/Sections";
import Sections2 from "layouts/MySections/Sections";
import Analytics from "layouts/ExpoDetails/analytics/Analytics";
import Orders from "layouts/Orders/Orders";
import SectionDetails from "layouts/MySections/SectionDetails";
import SectionProducts from "layouts/MySections/SectionProducts";
import RouteGuard from "./util/RouteGuard.js";
import LogOut from "layouts/LogOut/LogOut";
import CreateCompany from "layouts/authentication/CreateCompany";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RouteGuard />,
  },
  {
    path: "/startPage/StartPage",
    element: <StartPage />,
  },
  {
    path: "/authentication/sign-in",
    element: <SignIn />,
  },
  {
    path: "/authentication/create",
    element: <CreateCompany />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      { path: "Home", element: <Home /> },

      { path: "Activity", element: <Expos /> },
      {
        path: "Activity/:id",
        element: <ExpoDetails />,
        children: [
          { path: "details", element: <Details /> },
          { path: "sections", element: <Sections /> },
          { path: "analytics", element: <Analytics /> },
        ],
      },
      { path: "sections", element: <Sections2 /> },
      { path: "sections/:id", element: <SectionDetails /> },
      { path: "/dashboard/section-products/:id", element: <SectionProducts /> },
      { path: "products", element: <Orders /> },
      { path: "profile", element: <Profile /> },
      { path: "settings", element: <Settings /> },
      { path: "logout", element: <LogOut /> },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
