import React, {useState} from 'react';
import randomstring from 'randomstring';
import {ArrowLeftIcon, ArrowRightIcon} from '@heroicons/react/20/solid';
import {addMonths, format, getMonth, getYear} from 'date-fns';

const daysOfWeek = ['Nd', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob'];

const genIds = ({st = '', length = 5, amount = 1, present = []}) => {
  const ids = new Set([...present]);
  while (ids.size < amount) {
    let id = randomstring.generate(length);
    id = st + id;

    if (ids.has(id)) continue;
    ids.add(id);
  }
  return Array.from(ids);
};

const Calendar = ({
  date = new Date(),
  handleDateChange,
  dates,
}: {
  date: Date;
  handleDateChange: (date: Date) => void;
  dates: {date: string}[];
}): React.JSX.Element => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentMonth = getMonth(currentDate);
  const currentYear = getYear(currentDate);

  const daysInMonth = (month: number, year: number) =>
    new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month: number, year: number) =>
    new Date(year, month, 1).getDay();

  const onDateClick = e => {
    const day = parseInt(e.target.id);
    const selectedDate = new Date(currentYear, currentMonth, day);
    handleDateChange(selectedDate);
  };

  const RenderCalendar = () => {
    const weeks = [];

    const ids = genIds({amount: 50});
    const daysInCurrentMonth = daysInMonth(currentMonth, currentYear);
    const firstDay = firstDayOfMonth(currentMonth, currentYear);

    let day = 1;
    for (let week = 0; week < 6; week++) {
      const days = [];
      for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
        const id = ids.shift();
        if (week === 0 && dayOfWeek < firstDay) {
          days.push(
            <td
              key={id}
              className="border border-gray-300 p-2 w-10 text-center bg-gray-100 cursor-pointer"
            >
              &nbsp;
            </td>,
          );
        } else if (day > daysInCurrentMonth) {
          days.push(
            <td
              key={id}
              className="border border-gray-300 p-2 w-10 text-center bg-gray-100 cursor-pointer"
            >
              &nbsp;
            </td>,
          );
        } else {
          //eslint-disable-next-line
          const isAval = dates.find(function ({date}) {
            return (
              date ===
              format(new Date(currentYear, currentMonth, day), 'dd/MM/yyyy')
            );
          });
          const isSelectedDate =
            date &&
            day === date.getDate() &&
            currentMonth === date.getMonth() &&
            currentYear === date.getFullYear();
          days.push(
            //eslint-disable-next-line
            <td
              key={id}
              id={day}
              className={`
                border border-gray-300 p-2 w-10 text-center cursor-pointer ${
                  isSelectedDate ? 'bg-blue-500 text-white' : ''
                }
                ${!isAval ? 'opacity-10 w-10' : 'opacity-100 w-10'}

              `}
              onClick={onDateClick}
            >
              {day}
            </td>,
          );
          day++;
        }
      }
      weeks.push(<tr key={ids.shift()}>{days}</tr>);
    }

    return (
      <table className="border-collapse w-full max-w-400">
        <thead>
          <tr>
            {daysOfWeek.map(day => (
              <th
                key={day}
                className="border border-gray-300 p-2 w-10 text-center"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{weeks}</tbody>
      </table>
    );
  };

  const handleClick = n => () => {
    setCurrentDate(addMonths(currentDate, n));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full mb-4">
        <ArrowLeftIcon
          className="w-10 cursor-pointer"
          onClick={handleClick(-1)}
        />
        <div className="flex items-center">
          <h4 className="m-0 mr-4">
            {currentDate.toLocaleString('pl', {month: 'long'})}
          </h4>
          <h4 className="m-0">{currentYear}</h4>
        </div>
        <ArrowRightIcon
          className="w-10 cursor-pointer"
          onClick={handleClick(1)}
        />
      </div>
      <RenderCalendar />
    </div>
  );
};

export default Calendar;
