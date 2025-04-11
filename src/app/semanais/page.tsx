"use client";

import { useEffect, useState } from "react";
import { fetchMissoesSemanais, MissaoSemanal, MiniBoss } from "@/lib/services/missoesService";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SemanaisPage() {
  const [semanais, setSemanais] = useState<MissaoSemanal[]>([]);
  const [miniBoss, setMiniBoss] = useState<MiniBoss | null>(null);
  const [miniBossConcluido, setMiniBossConcluido] = useState(false);

  useEffect(() => {
    fetchMissoesSemanais().then((res) => {
      setSemanais(res.semanais);
      setMiniBoss(res.miniBoss);
    });
  }, []);

  const toggle = (id: number) => {
    setSemanais(prev =>
      prev.map(m => (m.id === id ? { ...m, concluida: !m.concluida } : m))
    );
  };

  const concluidas = semanais.filter(s => s.concluida).length;
  const total = semanais.length;
  const xpBase = concluidas * 50;
  const xpBonus = miniBossConcluido && miniBoss ? miniBoss.recompensa : 0;
  const xp = xpBase + xpBonus;


  return (
    <div className="max-w-3xl mx-auto py-8 space-y-6">
      <h1 className="text-2xl font-bold text-center">📅 Missões Semanais</h1>
      <p className="text-muted-foreground text-center">
        Você concluiu <span className="font-semibold">{concluidas}</span> de <span className="font-semibold">{total}</span> missões — <span className="text-green-600 font-bold">+{xp} XP</span>
        {miniBossConcluido && miniBoss && (
          <span className="text-xs block mt-1 text-orange-600">Inclui +{miniBoss.recompensa} XP do Mini Boss</span>
        )}
      </p>


      <div className="grid grid-cols-1 gap-4">
        {semanais.map(m => (
          <Card key={m.id} className={m.concluida ? "bg-green-100" : ""}>
            <CardContent className="flex justify-between items-center p-4">
              <span>{m.nome}</span>
              <Button
                variant={m.concluida ? "outline" : "default"}
                onClick={() => toggle(m.id)}
              >
                {m.concluida ? "Desfazer" : "Concluir"}
              </Button>
            </CardContent>
          </Card>
        ))}

        {miniBoss && (
          <Card className={miniBossConcluido ? "bg-green-100" : "bg-orange-100"}>
            <CardContent className="flex justify-between items-center p-4">
              <div>
                <h2 className="text-lg font-semibold">👹 Mini Boss</h2>
                <p className="text-sm text-muted-foreground">{miniBoss.descricao}</p>
                <p className="text-xs mt-1">Recompensa: +{miniBoss.recompensa} XP</p>
              </div>
              <Button
                variant={miniBossConcluido ? "outline" : "default"}
                onClick={() => setMiniBossConcluido(prev => !prev)}
              >
                {miniBossConcluido ? "Desfazer" : "Concluir"}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
