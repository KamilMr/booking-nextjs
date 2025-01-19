"use client";

interface MeetingType {
  name: string;
  value: number;
}

export interface SecondScreenProps {
  meetingType: Array<MeetingType>;
  onChange: (value: string) => void;
  value: string;
}

export const SecondScreen = ({
  meetingType,
  onChange,
  value,
}: SecondScreenProps) => {
  return (
    <fieldset>
      <div className="flex flex-col">
        {meetingType.map((meeting) => (
          <div key={meeting.name} className="flex align-middle mt-3">
            <input
              type="radio"
              id={meeting.name}
              name="meetingGroup"
              value={meeting.name}
              checked={value === meeting.name}
              onChange={(e) => onChange?.(e.target.value)} // Call onChange with value
            />
            <label className="ml-3" htmlFor={meeting.name}>
              {meeting.name}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
};
