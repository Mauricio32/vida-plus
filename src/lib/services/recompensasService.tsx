// lib/recompensasService.ts

export type Recompensa = {
    id: number;
    nome: string;
    tipo: "item" | "folga" | "mídia" | "oculta";
    xp: number;
  };
  
  export async function fetchRecompensas(): Promise<Recompensa[]> {
    return [
      { id: 1, nome: "Sessão Gamer", tipo: "folga", xp: 200 },
      { id: 2, nome: "Vinil novo", tipo: "item", xp: 300 },
      { id: 3, nome: "Novo Jogo", tipo: "item", xp: 500 },
      { id: 4, nome: "Switch 2", tipo: "item", xp: 1000 },
      { id: 5, nome: "Recompensa Misteriosa", tipo: "oculta", xp: 800 }
    ];
  }
  