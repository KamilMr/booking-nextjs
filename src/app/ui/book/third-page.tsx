'use client';
import clsx from 'clsx';
import Calendar from './calendar';
import {format as formatDate} from 'date-fns';

interface ThirdPageProps {
  date: Date;
  handleDateChange: (date: Date) => void;
  dates: {
    date: string;
    startHour: string;
    endHour: string;
    status: string;
    id: string;
  }[];
  handleHourSelect: (hour: string) => void;
  selectedHour: string;
}

const HoursToChose = ({
  dates,
  dateSelected = new Date(),
  onSelect,
  selectedHour,
}: {
  dates: {
    date: string;
    startHour: string;
    endHour: string;
    status: string;
    id: string;
  }[];
  dateSelected: Date;
  onSelect: (id: string) => void;
  selectedHour: string;
}) => {
  // Define the type for the accumulator
  type Hour = {
    hour: string;
    disabled: boolean;
    id: string;
  };
  const hours = dates.reduce<Hour[]>((pv, cv) => {
    const {date, startHour, endHour, status, id} = cv;
    const chDate = formatDate(new Date(dateSelected), 'dd/MM/yyyy');

    //console.log(date, chDate);
    if (date === chDate)
      pv.push({
        hour: `${startHour}-${endHour}`,
        disabled: status.toUpperCase() !== 'FREE',
        id,
      });

    return pv;
  }, []);

  return (
    <div className="flex flex-row flex-wrap justify-center sm:flex-nowrap sm:flex-col overflow-auto max-h-48 items-center">
      {hours.length ? (
        hours.map(({hour, disabled, id}) => (
          <button
            key={hour}
            onClick={() => onSelect(hour)}
            name={hour}
            disabled={disabled}
            className={clsx(
              selectedHour === hour ? 'bg-blue-500' : 'bg-not-blue',
              'text-black p-2 m-2 hover:bg-blue-300 max-w-32',
            )}
          >
            {hour}
          </button>
        ))
      ) : (
        <div className="flex justify-center items-center text-center h-full ml-4">
          <h4>
            Brak wolnych <br /> terminów
          </h4>
        </div>
      )}
    </div>
  );
};

export const ThirdPage = ({
  date,
  handleDateChange,
  dates,
  handleHourSelect,
  selectedHour,
}: ThirdPageProps) => {
  return (
    <div className="md:flex md:justify-around md:items-center">
      <Calendar date={date} handleDateChange={handleDateChange} dates={dates} />
      <HoursToChose
        selectedHour={selectedHour}
        dates={dates}
        dateSelected={date}
        onSelect={handleHourSelect}
      />
    </div>
  );
};
