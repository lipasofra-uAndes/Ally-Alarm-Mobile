import { createContext, useContext, useState, type ReactNode } from 'react';

export type Alarm = {
  id: string;
  name: string;
  time: string;
  color: string;
  image: number;
  rotated?: boolean;
};

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
};

const AlarmContext = createContext<AlarmContextValue | undefined>(undefined);

export function AlarmProvider({ children }: { children: ReactNode }) {
  const [alarms, setAlarms] = useState<Alarm[]>([initialAlarm]);

  const addAlarm = (alarm: Alarm) => {
    setAlarms((current) => (current.some((item) => item.id === alarm.id)
      ? current
      : [alarm, ...current]));
  };

  return <AlarmContext.Provider value={{ alarms, addAlarm }}>{children}</AlarmContext.Provider>;
}

export function useAlarms() {
  const context = useContext(AlarmContext);
  if (!context) {
    throw new Error('useAlarms must be used inside AlarmProvider');
  }
  return context;
}