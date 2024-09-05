export interface IUsuario {
  id: number,
  nome: string,
  departamento: string,
  telefone1: string,
  telefone2: string,
  email: string,
  senha: string,
  administrador: boolean | number
}