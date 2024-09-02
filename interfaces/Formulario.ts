export interface FormData {
  potencia: string | number
  valorContaEnergia: string | number
  fatorFinanceiroMes: number | string
}

export interface FatoresFinanceiros {
  id: number,
  meses: number,
  valor: number,
  porcentagem: number,
  implementacao: number
}