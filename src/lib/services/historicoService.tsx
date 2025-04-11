// lib/services/historicoService.ts

export type RegistroHistorico = {
    id: string;
    data: string;
    tipo: "missao" | "punição" | "recompensa";
    descricao: string;
    valor: number; // pode ser positivo ou negativo
  };
  
  export async function fetchHistorico(): Promise<RegistroHistorico[]> {
    return [
      {
        id: "1",
        data: "2025-04-24",
        tipo: "missao",
        descricao: "Concluiu 6 missões diárias",
        valor: 60
      },
      {
        id: "2",
        data: "2025-04-24",
        tipo: "punição",
        descricao: "Gastou R$200 em delivery",
        valor: -40
      },
      {
        id: "3",
        data: "2025-04-24",
        tipo: "recompensa",
        descricao: "Usou recompensa: Sessão Gamer",
        valor: -200
      },
      {
        id: "4",
        data: "2025-04-23",
        tipo: "missao",
        descricao: "Mini Boss concluído",
        valor: 100
      }
    ];
  }
  