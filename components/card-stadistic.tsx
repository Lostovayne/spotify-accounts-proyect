import { IdCardIcon } from "lucide-react";

interface Card {}

const CardStadistic = ({}: Card) => {
  return (
    <div className="bg-[#27292b] flex justify-between rounded-xl p-4 max-w-2xs w-full h-28">
      <div className="flex flex-col justify-between" >
        <h1>Gastos Mensuales</h1>
        <p className="text-lg font-bold" >$4500</p>
        <p>10% increase</p>
      </div>
      <IdCardIcon />
    </div>
  );
};
export default CardStadistic;
