"use client";
import { useState } from "react";
import clsx from "clsx";
import { Button } from "../ui/button";
import { FirstStep } from "@/app/ui/book/first-step";
import { Paper } from "@/app/ui/paper";
import { SecondScreen } from "@/app/ui/book/second-screen";
import { AvatarNameSection } from "@/app/ui/avatar-name-section";

interface Form {
  specialist: string;
  location: string;
  type: string;
  date: string;
  name: string;
  phone: string;
}

const initState = () => ({
  specialist: "Amy Burns",
  location: "",
  type: "",
  date: "",
  name: "",
  phone: "",
});

export default function Page() {
  const locations = [
    { id: 1, name: "Location 1" },
    { id: 2, name: "Location 2" },
    { id: 3, name: "Location 3" },
  ];
  const [page, setPage] = useState<number>(1);
  const [form, setForm] = useState<Form>(initState());

  const retriveData = (form) => {
    const tR: Array<string> = [];
    Object.keys(form).forEach((key) => {
      if (!form[key]) {
        return [];
      }
      const map = {
        specialist: "Specjalista",
        location: "Lokalizacja",
        type: "Typ spotkania",
        date: "Data",
        name: "Imię",
        phone: "Telefon",
      };

      if (!form[key]) return;

      tR.push(`${map[key]}: ${form[key]}`);
    });
    return tR;
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Paper className="flex flex-col w-full h-full md:w-1/2 md:h-4/5 justify-between">
        <AvatarNameSection
          src="/customers/amy-burns.png"
          sectionArr={retriveData(form)}
          alt="User"
        />
        {page === 1 && (
          <FirstStep
            locations={locations}
            onChange={(locationId) => {
              setForm({
                ...form,
                // @ts-ignore
                location: locations.find((l) => l.id === locationId).name,
              });
            }}
            value={locations.find((l) => l.name === form.location)?.id ?? null}
          />
        )}

        {page === 2 && (
          <SecondScreen
            meetingType={[
              { name: "test", value: 1 },
              { name: "test1", value: 2 },
            ]}
            onChange={(value: string) => {
              setForm({
                ...form,
                type: value,
              });
            }}
            value={form.type}
          />
        )}
        <div className="flex justify-between">
          <Button
            className={clsx(
              page === 1 ? "opacity-0 pointer-events-none" : "opacity-100",
            )}
            onClick={() => setPage(page - 1)}
          >
            {page === 1 ? "" : "Wstecz"}
          </Button>
          <Button onClick={() => setPage(page + 1)}>Dalej</Button>
        </div>
      </Paper>
    </div>
  );
}
