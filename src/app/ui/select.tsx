"use client";
// create generic select component

export const Select = ({
    label, value, onChange, children,
}: {
    label: string;
    value: number | null;
    onChange: (value: number) => void;
    children: React.ReactNode;
}) => {
    return (
        <div>
            <label>{label}</label>
            <select
                value={value ?? ""}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                onChange={(e) => onChange(Number(e.target.value))}
            >
                {children}
            </select>
        </div>
    );
};

