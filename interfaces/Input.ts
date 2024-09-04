export interface InputProps {
  index: number
  name: string
  placeholder: string;
  value: string;
  type: string,
  onChange: ({ name, text, setValues }: { name: string, text: string, setValues: React.Dispatch<React.SetStateAction<any>> }) => void,
  password?: boolean
  setValues: React.Dispatch<React.SetStateAction<any>>
  refs: React.RefObject<any>[];
  handleLogin: () => void
}

export interface LoginInputsProps {
  values: {
    email: string;
    password: string
  };
  setValues: React.Dispatch<React.SetStateAction<any>>
  onChange: ({ name, text, setValues }: { name: string, text: string, setValues: React.Dispatch<React.SetStateAction<any>> }) => void
}

export interface InputWithInfoProps {
  name: string;
  value: string;
  values: Values;
  setValues: React.Dispatch<React.SetStateAction<any>>;
  onChange: ({ name, text, setValues }: { name: string, text: string, setValues: React.Dispatch<React.SetStateAction<any>> }) => void
  placeholder: string;
  password?: boolean;
  type: string;
  refs?: React.RefObject<any>[];
  index?: number
  handleLogin?: () => void
  keyboardType?: string
  onEnd?: () => void
}
export interface CopyInputWithInfoProps {
  values: Values;
  setValues: React.Dispatch<React.SetStateAction<any>>;
  onChange: ({ name, text, setValues }: { name: string, text: string, setValues: React.Dispatch<React.SetStateAction<any>> }) => void
  mesesFatorFinanceiro?: []
}

export interface Values {
  proposta: string,
  data: string | Date,
  cnpj: string | number,
  cnpjMask: string | number
  nomeEmpresa: string,
  razao: string,
  fatorFinanceiroMes: number
  potencia: string | number,
  valorContaEnergia: string | number,
  valorContaEnergiaMask: string,
  vendedor: string,
  departamentoVendedor: string,
  telefoneVendedor: string,
  telefone2Vendedor: string
  emailVendedor: string,
  tomador: string,
  departamentoTomador: string,
  telefoneTomador: string,
  emailTomador: string,
  valor: number,
  valorMask: string
}