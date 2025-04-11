"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchRecompensas, Recompensa } from "@/lib/services/recompensasService";

const REVELADAS_KEY = "recompensasReveladasS1";

export default function RecompensasPage() {
  const [recompensas, setRecompensas] = useState<Recompensa[]>([]);
  const [utilizadas, setUtilizadas] = useState<number[]>([]);
  const [reveladas, setReveladas] = useState<{ [key: number]: string }>({});
  const [xpAtual, setXpAtual] = useState(740); // mockado, depois vem do service principal

  useEffect(() => {
    fetchRecompensas().then(setRecompensas);

    const armazenadas = localStorage.getItem(REVELADAS_KEY);
    if (armazenadas) {
      setReveladas(JSON.parse(armazenadas));
    }
  }, []);

  const usarRecompensa = (id: number) => {
    setUtilizadas(prev => [...prev, id]);
  };

  const revelar = (id: number) => {
    if (Object.keys(reveladas).length > 0) return; // apenas uma por temporada

    const ideias = [
      "Uma tarde sem culpa pra assistir anime velho",
      "Ganhar o direito de gastar R$80 com coisa inútil",
      "Fazer nada e não se sentir mal por isso",
      "Um vinil novo sem explicar pra ninguém",
      "Créditos de karma pra ignorar mensagem de chefe"
    ];
    const ideia = ideias[Math.floor(Math.random() * ideias.length)];
    const novas = { ...reveladas, [id]: ideia };
    setReveladas(novas);
    localStorage.setItem(REVELADAS_KEY, JSON.stringify(novas));
  };

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-6">
      <h1 className="text-2xl font-bold text-center">🎁 Recompensas</h1>
      <p className="text-center text-muted-foreground">
        XP disponível: <span className="text-green-600 font-bold">{xpAtual}</span>
      </p>

      <div className="grid grid-cols-1 gap-4">
        {recompensas.map(r => {
          const nome =
            r.tipo === "oculta" && reveladas[r.id] ? reveladas[r.id] : r.nome;

          return (
            <Card
              key={r.id}
              className={utilizadas.includes(r.id) ? "bg-gray-100" : ""}
            >
              <CardContent className="flex justify-between items-center p-4">
                <div>
                  <h2 className="text-lg font-semibold">
                    {r.tipo === "oculta" && !reveladas[r.id] ? "??????" : nome}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Custo: {r.xp} XP — Tipo: {r.tipo}
                  </p>
                </div>
                {r.tipo === "oculta" && !reveladas[r.id] ? (
                  <Button
                    variant="secondary"
                    onClick={() => revelar(r.id)}
                    disabled={utilizadas.includes(r.id) || xpAtual < r.xp || Object.keys(reveladas).length > 0}
                  >
                    Revelar Recompensa
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    disabled={utilizadas.includes(r.id) || xpAtual < r.xp}
                    onClick={() => usarRecompensa(r.id)}
                  >
                    {utilizadas.includes(r.id) ? "Usada" : "Usar"}
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
