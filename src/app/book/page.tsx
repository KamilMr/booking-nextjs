'use client';
import {useState} from 'react';
import clsx from 'clsx';
import {Button} from '../ui/button';
import {FirstStep} from '@/app/ui/book/first-step';
import {SecondScreen} from '@/app/ui/book/second-screen';
import {ThirdPage} from '../ui/book/third-page';
import {Paper} from '@/app/ui/paper';
import {AvatarNameSection} from '@/app/ui/book/avatar-name-section';
import {format as formatDate} from 'date-fns';

interface Form {
  specialist: string;
  location: string;
  type: string;
  date: Date;
  hour: string;
  name: string;
  phone: string;
}

const initState = () => ({
  specialist: 'Amy Burns',
  location: '',
  type: '',
  date: new Date(),
  hour: '',
  name: '',
  phone: '',
});

const allSteps = ['location', 'type', 'date', 'client', 'summary'];
const plTranslation = [
  'Miejsce spotkania',
  'Typ spotkania',
  'Data spotkania',
  'Dane klienta',
  'Podsumowanie',
];

export default function Page() {
  const locations = [
    {id: 1, name: 'Location 1'},
    {id: 2, name: 'Location 2'},
    {id: 3, name: 'Location 3'},
  ];
  const [page, setPage] = useState<number>(1);
  const [form, setForm] = useState<Form>(initState());

  const retriveData = form => {
    const tR: Array<string> = [];
    Object.keys(form).forEach(key => {
      if (!form[key]) {
        return [];
      }
      const map = {
        specialist: 'Specjalista',
        location: 'Lokalizacja',
        type: 'Typ spotkania',
        date: 'Dzień',
        hour: 'Godzina spotkania',
        name: 'Imię',
        phone: 'Telefon',
      };

      if (!form[key]) return;
      let value = form[key];

      if (key === 'date' || key === 'hour') {
        if (key === 'date') {
          value = formatDate(value, 'dd/MM/yyyy');
        }else {
          const foundHour = tR.findIndex(v => v.includes('Dzień'));
          tR[foundHour] = `${tR[foundHour]}, ${form.hour}`;
          return;
        }

      }

      tR.push(`${map[key]}: ${value}`);
    });
    return tR;
  };
  console.log(form)
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Paper className="flex flex-col w-full h-full md:w-1/2 md:h-4/5 justify-between relative">
        <AvatarNameSection
          src="/customers/amy-burns.png"
          sectionArr={retriveData(form)}
          alt="User"
        />
        {page === 1 && (
          <FirstStep
            locations={locations}
            onChange={locationId => {
              setForm({
                ...form,
                // @ts-ignore
                location: locations.find(l => l.id === locationId).name,
              });
            }}
            value={locations.find(l => l.name === form.location)?.id ?? null}
          />
        )}

        {page === 2 && (
          <SecondScreen
            meetingType={[
              {name: 'test', value: 1},
              {name: 'test1', value: 2},
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

        {page === 3 && (
          <ThirdPage
            date={form.date}
            selectedHour={form.hour}
            handleHourSelect={(hour: string) => {
              setForm({
                ...form,
                hour,
              });
            }}
            handleDateChange={(date: Date) => {
              if (
                !date ||
                !mockDataDates.find(
                  d =>
                    d.date === formatDate(date, 'dd/MM/yyyy'),
                )
              )
                return;
              setForm({
                ...form,
                date,
              });
            }}
            dates={mockDataDates}
          />
        )}
        <div className="flex justify-between">
          <Button
            className={clsx(
              page === 1 ? 'opacity-0 pointer-events-none' : 'opacity-100',
            )}
            onClick={() => setPage(page - 1)}
          >
            {page === 1 ? '' : 'Wstecz'}
          </Button>
          <Button
            onClick={() => setPage(page + 1)}
            disabled={page === allSteps.length}
          >
            Dalej
          </Button>
        </div>
        <div className="top-0 left-0 absolute">{`${page}/${allSteps.length}`}</div>
      </Paper>
    </div>
  );
}

//  const {date, startHour, endHour, status, id} = cv;
const mockDataDates = [
  {date : '22/01/2025', startHour: '08:00', endHour: '09:00', status: 'free'},
  {date: '22/01/2025', startHour: '10:00', endHour: '11:00', status: 'free'},
  {date: '22/01/2025', startHour: '12:00', endHour: '13:00', status: 'free'},
  {date: '22/01/2025', startHour: '14:00', endHour: '15:00', status: 'free'},
  {date: '22/01/2025', startHour: '16:00', endHour: '17:00', status: 'free'},
  {date: '22/01/2025', startHour: '18:00', endHour: '19:00', status: 'free'},
  {date: '22/01/2025', startHour: '20:00', endHour: '21:00', status: 'free'},
  {date: '22/01/2025', startHour: '22:00', endHour: '23:00', status: 'free'},
  {date: '18/01/2025', startHour: '11:00', endHour: '12:00', status: 'free'},
  {date: '19/01/2025', startHour: '12:00', endHour: '13:00', status: 'free'},
];
