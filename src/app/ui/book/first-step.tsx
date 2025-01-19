"use client";
import clsx from "clsx";
import { Select } from "../select";

export const FirstStep = ({
  className,
  locations,
  onChange,
  value,
}: {
  locations: Array<{ id: number; name: string }>;
  onChange: (value: number) => void;
  value: number | null;
  className?: string;
}) => {
  return (
    <div className={clsx(className)}>
      <Select label="Wybierz miejsce" value={value} onChange={onChange}>
        <option value="">Select Location</option>
        {locations.map((location) => (
          <option key={location.id} value={location.id}>
            {location.name}
          </option>
        ))}
      </Select>
    </div>
  );
};
