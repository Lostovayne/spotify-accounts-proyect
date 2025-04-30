import { SidebarTrigger } from "@/components/ui/sidebar";

const Navbar = () => {
  return (
    <nav className="fixed top-0 border-b left-0 right-0 h-16 bg-dash-background flex items-center px-2 pr-5 z-50">
      {/* Menu y logo */}
      <div className="flex items-center shrink-0">
        <SidebarTrigger />
      </div>
    </nav>
  );
};
export default Navbar;
