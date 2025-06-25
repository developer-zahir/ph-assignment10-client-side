import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Blog from "../pages/Tips/AllTips";
import Contact from "../pages/Contact/Contact";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import ErrorPage from "../layout/ErrorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import AllGardeners from "../pages/Gardener/AllGardeners";
import AddGardener from "../pages/Gardener/AddGardener";
import ShareTips from "../pages/Tips/ShareTips";
import AllTips from "../pages/Tips/AllTips";
import SingleTips from "../pages/Tips/SingleTips";
import MyTips from "../pages/MyTips/MyTips";
import EditeTips from "../pages/MyTips/EditTips";
import EditTips from "../pages/MyTips/EditTips";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        index: true,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/share-tips",
        element: (
          <PrivateRoute>
            <ShareTips></ShareTips>
          </PrivateRoute>
        ),
      },
      {
        path: "/all-tips",
        element: <AllTips></AllTips>,
      },
      {
        path: "/all-tips/:id",
        loader: ({ params }) => fetch(`https://garden-hub-three.vercel.app/all-tips/${params.id}`),
        element: (
          <PrivateRoute>
            <SingleTips></SingleTips>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-tips",
        element: (
          <PrivateRoute>
            <MyTips></MyTips>
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-tips/:id",
        element: (
          <PrivateRoute>
            <EditTips></EditTips>
          </PrivateRoute>
        ),
      },
      {
        path: "/add-gardener",
        element: (
          <PrivateRoute>
            <AddGardener></AddGardener>
          </PrivateRoute>
        ),
      },
      {
        path: "/all-gardeners",
        element: <AllGardeners></AllGardeners>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },

      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);

export default router;
