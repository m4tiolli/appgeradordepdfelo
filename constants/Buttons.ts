import { router } from "expo-router";

export const buttons = [
  {
    title: "Gerar proposta",
    onPress: () => router.push("/gerar-proposta"),
  },
  {
    title: "Visualizar propostas",
    onPress: () => router.push("/visualizar-propostas"),
  },
  {
    title: "Cadastrar usuário",
    onPress: () => router.push("/cadastrar-usuario"),
  },
  {
    title: "Visualizar usuários",
    onPress: () => router.push("/visualizar-usuarios"),
  },
  {
    title: "Alterar dados do perfil",
    onPress: () => router.push("/perfil"),
  },
  {
    title: "Sair",
    onPress: () => router.push("/login"),
  }
]