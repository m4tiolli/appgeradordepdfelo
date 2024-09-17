import axios from "axios"
import { getToken } from "./TokenValid"

export const fetchUserById = async ({ setUser }: any) => {
  const token = await getToken()
  await axios.get(process.env.EXPO_PUBLIC_URL_API + "api/perfil", { headers: { Authorization: token } })
    .then((response) => {
      setUser(response.data)
    })
    .catch((error) => {
      console.error("Erro ao buscar perfil:", error)
    })
}

export const fetchFatoresFinanceiros = async ({ setFatores }: any) => {
  await axios.get(process.env.EXPO_PUBLIC_URL_API + "api/ef/fatores-financeiros")
    .then((response) => setFatores(response.data))
    .catch(err => console.error(err))
}

export const fetchPropostas = async ({ setPropostas }: any) => {
  await axios.get(process.env.EXPO_PUBLIC_URL_API + "api/ef/buscar-proposta")
    .then((response) => setPropostas(response.data))
    .catch(err => console.error(err))
}

export const fetchUsuarios = async ({setUsuarios}: any) => {
  await axios.get(process.env.EXPO_PUBLIC_URL_API + "api/buscar-usuarios")
    .then((response) => setUsuarios(response.data))
    .catch(err => console.error(err))
}

export const fetchDepartamentos = async (): Promise<any[]> => {
  return await axios.get(process.env.EXPO_PUBLIC_URL_API + "api/departamentos")
    .then((response) => {
      return response.data
    })
    .catch(err => {
      console.error(err)
      return []
    })
}