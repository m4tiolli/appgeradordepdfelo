import axios from "axios"
import { getToken } from "./TokenValid"

const fetchUserById = async ({ setUser }: any) => {
  const token = await getToken()
  axios.get("api/perfil", { headers: { authorization: token } })
    .then((response) => {
      setUser(response.data)
    })
    .catch((error) => {
      console.error(error.response)
    })
}