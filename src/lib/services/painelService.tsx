// lib/painelService.ts

export type XPStatus = {
    total: number;
    semanal: number;
    ultimaAtualizacao: string;
  };
  
  export type MissaoStatus = {
    semanaisConcluidas: number;
    totalSemana: number;
    miniBoss: string;
    bigBoss: string;
  };
  
  export type RecompensaStatus = {
    disponiveis: string[];
    usadas: string[];
    ocultas: number;
  };
  
  export type Punicao = {
    descricao: string;
    valor: number;
  };
  
  export type PainelData = {
    xp: XPStatus;
    missoes: MissaoStatus;
    recompensas: RecompensaStatus;
    punicoes: Punicao[];
  };
  
  // simulação de fetch de dados do painel
  export async function fetchPainelData(): Promise<PainelData> {
    return {
      xp: { total: 345, semanal: 60, ultimaAtualizacao: "hoje às 09h17" },
      missoes: {
        semanaisConcluidas: 3,
        totalSemana: 6,
        miniBoss: "Não gastar no trabalho ❌",
        bigBoss: "Criar o App - Etapa 3 de 6",
      },
      recompensas: {
        disponiveis: ["Sessão Gamer", "Folga Real"],
        usadas: ["Novo Jogo"],
        ocultas: 1,
      },
      punicoes: [
        { descricao: "Não escovou os dentes", valor: -15 },
        { descricao: "Gastou R$200 em delivery", valor: -40 },
        { descricao: "Preguiça do banho", valor: -10 },
      ],
    };
  }
  