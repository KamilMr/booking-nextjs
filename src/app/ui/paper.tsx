"use client";
import clsx from "clsx";

// create paper component
export const Paper = ({
    children, className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={clsx("p-4 bg-white shadow-lg", className)}>{children}</div>
    );
};

