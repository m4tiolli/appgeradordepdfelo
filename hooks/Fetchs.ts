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

export const fetchCodigoProposta = async () => {
  
}