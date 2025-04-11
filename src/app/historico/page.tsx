"use client";

import { useEffect, useState } from "react";
import { fetchHistorico, RegistroHistorico } from "@/lib/services/historicoService";
import { Card, CardContent } from "@/components/ui/card";
import { Select } from "@/components/ui/select";

function formatDateToBR(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit"
  });
}

function getWeekKey(dateStr: string) {
  const d = new Date(dateStr);
  const year = d.getFullYear();
  const firstDay = new Date(d.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((d.getTime() - firstDay.getTime()) / (1000 * 60 * 60 * 24));
  const week = Math.ceil((dayOfYear + firstDay.getDay() + 1) / 7);
  return `${year}-S${week}`;
}

const tipoIcone: Record<string, string> = {
  missao: "✅",
  punição: "⚠️",
  recompensa: "🎁"
};

export default function HistoricoPage() {
  const [registros, setRegistros] = useState<RegistroHistorico[]>([]);
  const [filtro, setFiltro] = useState<string>("todos");

  useEffect(() => {
    fetchHistorico().then(setRegistros);
  }, []);

  const getCor = (tipo: string) => {
    switch (tipo) {
      case "missao":
        return "text-green-600";
      case "punição":
        return "text-red-500";
      case "recompensa":
        return "text-yellow-600";
      default:
        return "text-gray-800";
    }
  };

  const agrupado = registros
    .filter(r => filtro === "todos" || r.tipo === filtro)
    .reduce((acc, r) => {
      const key = getWeekKey(r.data);
      if (!acc[key]) acc[key] = [];
      acc[key].push(r);
      return acc;
    }, {} as { [key: string]: RegistroHistorico[] });

  return (
    <div className="max-w-2xl mx-auto py-8 space-y-6">
      <h1 className="text-2xl font-bold text-center">📉 Histórico</h1>

      <div className="text-center">
        <Select
          label="Filtrar por tipo"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          options={[
            { label: "Todos", value: "todos" },
            { label: "Missões", value: "missao" },
            { label: "Punições", value: "punição" },
            { label: "Recompensas", value: "recompensa" }
          ]}
        />
      </div>

      {Object.entries(agrupado).map(([semana, items]) => {
        const xpTotal = items.reduce((sum, r) => sum + r.valor, 0);
        return (
          <div key={semana} className="space-y-4">
            <h2 className="text-lg font-semibold border-b pb-1 flex justify-between">
              <span>
                Semana {semana.replace("-S", " ")} ({formatDateToBR(items[0].data)})
              </span>
              <span className="text-sm text-muted-foreground">XP Total: {xpTotal > 0 ? "+" : ""}{xpTotal}</span>
            </h2>
            {items.map(r => (
              <Card key={r.id}>
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">{formatDateToBR(r.data)}</p>
                    <p className="font-medium">
                      {tipoIcone[r.tipo]} {r.descricao}
                    </p>
                  </div>
                  <span className={`font-bold ${getCor(r.tipo)}`}>
                    {r.valor > 0 ? "+" : ""}{r.valor} XP
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      })}
    </div>
  );
}