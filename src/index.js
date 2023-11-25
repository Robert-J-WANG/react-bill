import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App";
import router from "@/router";
import { RouterProvider } from "react-router-dom";
import "./theme.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
