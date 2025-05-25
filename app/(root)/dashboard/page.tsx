"use client";

import { DashboardTabs } from "@/modules/dashboard";
import EarningsCard from "@/modules/dashboard/earnings-card";
import ExpensesCard from "@/modules/dashboard/expenses-card";
import RenewalsCard from "@/modules/dashboard/renewals-card";
import { toast } from "sonner";

const Page = () => {
  const handleClick = () => {
    toast.success("Agregado con éxito");
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid md:px-12 gap-5 2xl:pl-24 auto-rows-min  lg:grid-cols-3">
        <EarningsCard />
        <ExpensesCard />
        <RenewalsCard />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl mt-5 pb-10 pt-12 bg-muted/50 md:min-h-min relative ">
        <div className="mx-auto container">
          <DashboardTabs />
        </div>
      </div>
    </div>
  );
};
export default Page;
