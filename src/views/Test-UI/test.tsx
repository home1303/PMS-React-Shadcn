"use client";
import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
const Test: React.FC = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <div className="flex flex-col gap-4 mt-[64px]">
  
      <Calendar selected={date} onSelect={setDate} />

      <Calendar monthOnly selected={date} onSelect={setDate} />

      <Calendar yearOnly selected={date} onSelect={setDate} />
    </div>
  );
};
export default Test;
