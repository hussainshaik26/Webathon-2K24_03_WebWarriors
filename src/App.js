import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout/RootLayout";
import Home from "./components/home/Home.js";
import Signin from "./components/Signin/Signin";
import Signup from "./components/SignUp/Signup";
import Article from "./components/Article/Article.js";
import "bootstrap/dist/css/bootstrap.css";
import Main from "./components/Main/Main.js";
import UserDashBoard from "./components/UserDashboard/UserDashBoard.js";
import AddArticle from "./components/AddArticle/AddArticle.js";

function App() {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/signin",
          element: <Signin />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
      ],
    },
    {
      path: "/main",
      element: <Main />,
    },
    {
      path: "/user-dashboard",
      element: <UserDashBoard />,
    },
    {
      path: "/article",
      element: <Article />,
    },
    {
      path: "/add-article",
      element: <AddArticle />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
