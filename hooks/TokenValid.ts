import AsyncStorage from "@react-native-async-storage/async-storage";
import JWT from 'expo-jwt';

export const getToken = async () => {
  const token = await AsyncStorage.getItem("token");
  return token
}

export const isTokenValid = async () => {
  const token = await getToken()
  if (!token || token == null || token == undefined) return false
  const key = 'secret_key'
  const decoded = JWT.decode(token, key)
  const jwtDate = decoded.exp
  if (!jwtDate) return false
  if (Date.now() >= jwtDate * 1000) {
    return false
  } else {
    return true
  }
}