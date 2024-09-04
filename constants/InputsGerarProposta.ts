import { CopyInputWithInfoProps, InputWithInfoProps } from "@/interfaces/Input";
import { calcularValorTotal } from "./Calculo";

export const InputsPropostas= ({values, setValues, onChange, mesesFatorFinanceiro}: CopyInputWithInfoProps): InputWithInfoProps[]  => [
  {
    name: "proposta",
    value: values.proposta,
    onChange: onChange,
    placeholder: "Código da Proposta",
    type: "text",
    setValues: setValues,
    values: values
  }, 
  {
    name: "cnpj",
    value: values.cnpjMask as string,
    onChange: onChange,
    placeholder: "CNPJ da Empresa",
    type: "numeric",
    setValues: setValues,
    values: values,
    keyboardType: "numeric"
  },
  {
    name: "nomeEmpresa",
    value: values.nomeEmpresa,
    onChange: onChange,
    placeholder: "Nome da Empresa",
    type: "text",
    setValues: setValues,
    values: values
  },
  {
    name: "razao",
    value: values.razao,
    onChange: onChange,
    placeholder: "Razão Social da Empresa",
    type: "text",
    setValues: setValues,
    values: values
  },
  {
    name: "potencia",
    value: values.potencia as string,
    onChange: onChange,
    placeholder: "Potência do Equipamento em KVA",
    type: "numeric",
    setValues: setValues,
    values: values,
    keyboardType: "numeric"
  },
  {
    name: "valorContaEnergia",
    value: values.valorContaEnergiaMask as string,
    onChange: onChange,
    placeholder: "Valor da conta de Energia em R$",
    type: "numeric",
    setValues: setValues,
    values: values,
    keyboardType: "numeric",
    onEnd: () => calcularValorTotal({
      formData: values,
      setFormData: setValues,
      mesesFatorFinanceiro
    })
  },
  {
    name: "vendedor",
    value: values.vendedor,
    onChange: onChange,
    placeholder: "Vendedor",
    type: "text",
    setValues: setValues,
    values: values
  },
  {
    name: "departamentoVendedor",
    value: values.departamentoVendedor,
    onChange: onChange,
    placeholder: "Departamento do Vendedor",
    type: "text",
    setValues: setValues,
    values: values
  },
  {
    name: "emailVendedor",
    value: values.emailVendedor,
    onChange: onChange,
    placeholder: "Email do Vendedor",
    type: "text",
    setValues: setValues,
    values: values
  },
  {
    name: "telefone1vendedor",
    value: values.telefoneVendedor,
    onChange: onChange,
    placeholder: "Telefone do Vendedor",
    type: "text",
    setValues: setValues,
    values: values
  },
  {
    name: "tomador",
    value: values.tomador,
    onChange: onChange,
    placeholder: "Tomador",
    type: "text",
    setValues: setValues,
    values: values
  },
  {
    name: "emailTomador",
    value: values.emailTomador,
    onChange: onChange,
    placeholder: "Email do Tomador",
    type: "text",
    setValues: setValues,
    values: values
  },
  {
    name: "telefoneTomador",
    value: values.telefoneTomador,
    onChange: onChange,
    placeholder: "Telefone do Tomador",
    type: "text",
    setValues: setValues,
    values: values
  },
  {
    name: "valor",
    value: values.valorMask,
    onChange: onChange,
    placeholder: "Valor total da proposta em R$",
    type: "numeric",
    setValues: setValues,
    values: values,
    keyboardType: "numeric"
  }
]