import Navbar from "@/app/components/navbar";
import SidebarApp from "@/app/components/sidebar-app";
import { SidebarProvider } from "@/components/ui/sidebar";
import { JSX } from "react";

interface Props {
  children: JSX.Element;
}

const DashBoardLayout = ({ children }: Props) => {
  return (
    <SidebarProvider defaultOpen={false}  >
      <div className="w-full">
        <Navbar />
        <div className="flex min-h-screen pt-[4rem]">
          <SidebarApp />
          <main className="flex-1 overflow-y-auto bg-dash-background">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};
export default DashBoardLayout;
