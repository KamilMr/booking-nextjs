"use client";
import Image from "next/image";

// create avatar component
export const Avatar = ({ src, alt }: { src: string; alt: string; }) => {
    return (
        <Image
            src={src}
            width={200}
            height={200}
            className="w-24 h-24 rounded-full"
            alt={alt} />
    );
};

