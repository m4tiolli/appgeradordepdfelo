import { CopyInputWithInfoProps, InputWithInfoProps } from "@/interfaces/Input";

export const InputsPropostas= ({values, setValues, onChange}: CopyInputWithInfoProps): InputWithInfoProps[]  => [
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
    name: "data",
    value: values.data,
    onChange: onChange,
    placeholder: "Data da Proposta",
    type: "date",
    setValues: setValues,
    values: values
  },
  {
    name: "cnpj",
    value: values.cnpj,
    onChange: onChange,
    placeholder: "CNPJ da Empresa",
    type: "text",
    setValues: setValues,
    values: values
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
    value: values.potencia,
    onChange: onChange,
    placeholder: "Potência do Equipamento em KVA",
    type: "text",
    setValues: setValues,
    values: values
  },
  {
    name: "valorContaEnergia",
    value: values.valorContaEnergia,
    onChange: onChange,
    placeholder: "Valor da conta de Energia em R$",
    type: "text",
    setValues: setValues,
    values: values
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
    value: values.valor.toString(),
    onChange: onChange,
    placeholder: "Valor",
    type: "text",
    setValues: setValues,
    values: values
  }
]