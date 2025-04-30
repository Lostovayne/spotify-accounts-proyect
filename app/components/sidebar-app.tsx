import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import SidebarSections from "./sidebar-sections";

const SidebarApp = () => {
  return (
    <Sidebar className="pt-16 z-40" collapsible="icon" >
      <SidebarContent className="bg-dash-background" >
        <SidebarSections />
      </SidebarContent>
    </Sidebar>
  );
};
export default SidebarApp;
