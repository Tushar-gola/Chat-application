import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

export function Toast() {
  return <ToastContainer limit={10} className="w-[400px]" />;
}

type ToastProps = {
  message: string;
  type: "info" | "success" | "warning" | "error" | "default";
};
export const showToast = ({ message, type }: ToastProps) => {
  let classByType = "";
  if (type === "error") classByType = "bg-red-100 text-red-600 p-1";
  if (type === "info") classByType = "bg-blue-100 text-blue-600";
  if (type === "success") classByType = "bg-green-100 text-green-600";
  if (type === "warning") classByType = "bg-yellow-100 text-yellow-600";

  return toast(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    className: `${classByType}`,
    type,
  });
};
