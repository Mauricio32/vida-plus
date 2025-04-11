"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { fetchPainelData, PainelData } from "@/lib/services/painelService";

export default function PainelPage() {
  const [data, setData] = useState<PainelData | null>(null);

  useEffect(() => {
    fetchPainelData().then((res) => {
      console.log("PAINEL DATA", res);
      setData(res);
    });
  }, []);

  if (!data) return <p className="text-center">Carregando painel...</p>;

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold text-center">📊 Painel Geral da Season</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 space-y-2">
            <h2 className="text-xl font-semibold">🔢 XP Atual</h2>
            <p className="text-3xl font-bold text-green-500">{data.xp.total}</p>
            <p className="text-sm text-muted-foreground">+{data.xp.semanal} XP nesta semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-2">
            <h2 className="text-xl font-semibold">📅 Missões da Semana</h2>
            <ul className="list-disc list-inside">
              <li>{data.missoes.semanaisConcluidas}/{data.missoes.totalSemana} semanais concluídas</li>
              <li>Mini Boss: {data.missoes.miniBoss}</li>
              <li>Big Boss: {data.missoes.bigBoss}</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-2">
            <h2 className="text-xl font-semibold">🏆 Recompensas</h2>
            <ul className="list-disc list-inside">
              <li>Disponíveis: {data.recompensas.disponiveis.join(", ")}</li>
              <li>Usadas: {data.recompensas.usadas.join(", ")}</li>
              <li>Ocultas: {data.recompensas.ocultas}</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-2">
            <h2 className="text-xl font-semibold">💥 Penalidades Recentes</h2>
            <ul className="list-disc list-inside text-red-500">
              {data.punicoes.map((p, index) => (
                <li key={index}>
                  {p.valor} XP: {p.descricao}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="text-center text-muted-foreground">
        Última atualização: {data.xp.ultimaAtualizacao}
      </div>
    </div>
  );
}
