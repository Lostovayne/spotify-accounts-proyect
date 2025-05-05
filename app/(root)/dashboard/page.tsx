"use client";

import { Button } from "@/components/ui/button";
import { DashboardTabs } from "@/modules/dashboard";
import EarningsCard from "@/modules/dashboard/earnings-card";
import ExpensesCard from "@/modules/dashboard/expenses-card";
import RenewalsCard from "@/modules/dashboard/renewals-card";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";

const Page = () => {
  const handleClick = () => {
    toast.success("Agregado con éxito");
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid md:px-12 gap-y-5 lg:pl-24 auto-rows-min  lg:grid-cols-3">
        <EarningsCard />
        <ExpensesCard />
        <RenewalsCard />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl p-6 bg-muted/50 md:min-h-min relative ">
        <div className="mx-auto container mt-10" >
        <DashboardTabs />
        </div>
      </div>
    </div>
  );
};
export default Page;
