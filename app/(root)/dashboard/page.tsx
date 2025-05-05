"use client"

import { DashboardTabs } from "@/modules/dashboard";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";

const Page = () => {
  const handleClick = () => {
    toast.success("Agregado con éxito");
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl p-6 bg-muted/50 md:min-h-min relative">
        <Button
          variant={"outline"}
          size={"sm"}
          className="absolute right-10 top-5"
          onClick={handleClick}
        >
          <PlusIcon />
          <span className="hidden md:block">Agregar Cuenta</span>
        </Button>
        <DashboardTabs />
      </div>
    </div>
  );
};
export default Page;
