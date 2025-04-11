// lib/missoesService.ts

export type MissaoSemanal = {
  id: number;
  nome: string;
  concluida: boolean;
};

export type MiniBoss = {
  descricao: string;
  recompensa: number;
};

export type MissaoSemanalResponse = {
  semanais: MissaoSemanal[];
  miniBoss: MiniBoss;
};

export async function fetchMissoesSemanais(): Promise<MissaoSemanalResponse> {
  return {
    semanais: [
      { id: 1, nome: "Ver sua mãe ou falar com ela", concluida: false },
      { id: 2, nome: "Completar módulo da MBA ou estudar IA", concluida: true },
      { id: 3, nome: "Fazer terapia", concluida: true },
      { id: 4, nome: "Organizar algo físico", concluida: false },
      { id: 5, nome: "Cozinhar algo de verdade", concluida: true },
      { id: 6, nome: "Fazer um rolê fora de casa", concluida: false }
    ],
    miniBoss: {
      descricao: "Não gastar com besteira no trabalho",
      recompensa: 100
    }
  };
}
