"use client";

import { MissionCard } from "./MissionCard";

type Mission = {
  id: number;
  name: string;
  completed: boolean;
};

type Props = {
  missions: Mission[];
  toggleMission: (id: number) => void;
};

export function MissionList({ missions, toggleMission }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {missions.map(m => (
        <MissionCard
          key={m.id}
          id={m.id}
          name={m.name}
          completed={m.completed}
          onToggle={toggleMission}
        />
      ))}
    </div>
  );
}
