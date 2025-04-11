"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
  id: number;
  name: string;
  completed: boolean;
  onToggle: (id: number) => void;
};

export function MissionCard({ id, name, completed, onToggle }: Props) {
  return (
    <Card className={completed ? "bg-green-100" : ""}>
      <CardContent className="flex justify-between items-center p-4">
        <span>{name}</span>
        <Button
          variant={completed ? "outline" : "default"}
          onClick={() => onToggle(id)}
        >
          {completed ? "Desfazer" : "Concluir"}
        </Button>
      </CardContent>
    </Card>
  );
}
