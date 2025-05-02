import { JSX } from "react";
import DashBoardLayout from "../../layout/dashboard-layout";

const LayoutRoot = ({ children }: { children: JSX.Element }) => {
  return <DashBoardLayout>{children}</DashBoardLayout>;
};
export default LayoutRoot;
