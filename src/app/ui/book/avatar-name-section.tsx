'use client';
import {Avatar} from '../avatar';

// create section for avatgar and name
export const AvatarNameSection = ({
  src,
  sectionArr = [],
  alt,
}: {
  src: string;
  sectionArr: Array<string>;
  alt: string;
}) => {
  return (
    <div className="flex items-center space-x-2 justify-between h-[140px]">
      <Avatar src={src} alt={alt} />
      <div className=" w-3/4 p-2 h-full">
        {sectionArr.map(val => (
          <span className="text-md block" key={val}>
            {val}
          </span>
        ))}
      </div>
    </div>
  );
};
