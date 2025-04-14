// app/painel/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { fetchPainelData } from "@/lib/services/painelService";

interface PainelData {
  xp: {
    total: number;
    semanal: number;
    ultimaAtualizacao: string;
  };
  missoes: {
    semanaisConcluidas: number;
    totalSemana: number;
    miniBoss: string;
    bigBoss: string;
  };
  recompensas: {
    disponiveis: string[];
    usadas: string[];
    ocultas: number;
  };
  punicoes: {
    descricao: string;
    valor: number;
  }[];
}

export default function PainelPage() {
  const [data, setData] = useState<PainelData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchPainelData();
      setData(response);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Painel de Controle</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xl">
          <CardContent className="p-6">
            <p className="text-sm">XP Total</p>
            <p className="text-3xl font-bold">{data?.xp.total ?? "--"}</p>
            <p className="text-xs mt-2">
              Semana: {data?.xp.semanal ?? "--"} | Atualizado: {data?.xp.ultimaAtualizacao ?? "--"}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-xl">
          <CardContent className="p-6">
            <p className="text-sm">Missões Semanais</p>
            <p className="text-3xl font-bold">
              {data ? `${data.missoes.semanaisConcluidas}/${data.missoes.totalSemana}` : "--"}
            </p>
            <p className="text-xs mt-2">Mini Boss: {data?.missoes.miniBoss ?? "--"}</p>
            <p className="text-xs">Big Boss: {data?.missoes.bigBoss ?? "--"}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-orange-400 text-white shadow-xl">
          <CardContent className="p-6">
            <p className="text-sm">Recompensas Disponíveis</p>
            <p className="text-3xl font-bold">{data?.recompensas.disponiveis.length ?? "--"}</p>
            <p className="text-xs mt-2">Usadas: {data?.recompensas.usadas.join(", ") || "Nenhuma"}</p>
            <p className="text-xs">Ocultas: {data?.recompensas.ocultas ?? 0}</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-3 bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-xl">
          <CardContent className="p-6">
            <p className="text-sm">Punições Recentes</p>
            {data?.punicoes.length ? (
              <ul className="mt-4 space-y-2 text-sm">
                {data.punicoes.map((p, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{p.descricao}</span>
                    <span className="font-bold">{p.valor} XP</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs mt-2">Sem punições recentes</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
