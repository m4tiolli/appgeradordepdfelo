import { LoginInputsProps } from "@/interfaces/Input";

export const LoginInputs = ({ onChange, values, setValues }: LoginInputsProps) => [
  {
    name: "email",
    placeholder: "E-mail",
    value: values.email,
    type: "email",
    onChange: onChange,
    setValues: setValues
  },
  {
    name: "password",
    placeholder: "Senha",
    value: values.password,
    type: "text",
    onChange: onChange,
    password: true,
    setValues: setValues
  }
]