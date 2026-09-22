import { createContext, useContext, useState, type ReactNode } from 'react';

export type Alarm = {
  id: string;
  name: string;
  time: string;
  color: string;
  image: number;
  rotated?: boolean;
};

const calendarAlarms: Alarm[] = [
  {
    id: 'medicine',
    name: 'Pastilla de la memoria',
    time: '8:00am',
    color: '#fdef90',
    image: require('../../assets/images/icon-medicine.png'),
  },
  {
    id: 'standup',
    name: 'Daily Standup',
    time: '9:30am',
    color: '#fbc3c3',
    image: require('../../assets/images/icon-laptop.png'),
  },
  {
    id: 'birthday',
    name: 'Reunión cumpleaños',
    time: '4:00pm',
    color: '#b1cbf2',
    image: require('../../assets/images/icon-calendar2.png'),
  },
];

const initialAlarm: Alarm = {
  id: 'gym',
  name: 'Entreno en gimnasio',
  time: '6:00am',
  color: '#c2ebbc',
  image: require('../../assets/images/icon-gym.png'),
  rotated: true,
};

type AlarmContextValue = {
  alarms: Alarm[];
  addAlarm: (alarm: Alarm) => void;
  connectCalendar: () => void;
};

const AlarmContext = createContext<AlarmContextValue | undefined>(undefined);

export function AlarmProvider({ children }: { children: ReactNode }) {
  const [alarms, setAlarms] = useState<Alarm[]>([initialAlarm]);

  const addAlarm = (alarm: Alarm) => {
    setAlarms((current) => (current.some((item) => item.id === alarm.id)
      ? current
      : [alarm, ...current]));
  };

  const connectCalendar = () => {
    setAlarms((current) => [
      ...current,
      ...calendarAlarms.filter((alarm) => !current.some((item) => item.id === alarm.id)),
    ]);
  };

  return <AlarmContext.Provider value={{ alarms, addAlarm, connectCalendar }}>{children}</AlarmContext.Provider>;
}

export function useAlarms() {
  const context = useContext(AlarmContext);
  if (!context) {
    throw new Error('useAlarms must be used inside AlarmProvider');
  }
  return context;
}