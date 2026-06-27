import type React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}  <ToastContainer /></>;
}
