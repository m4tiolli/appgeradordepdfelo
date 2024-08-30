import { handleLogin } from '@/hooks/Handles';
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
}
export interface CopyInputWithInfoProps {
  values: Values;
  setValues: React.Dispatch<React.SetStateAction<any>>;
  onChange: ({ name, text, setValues }: { name: string, text: string, setValues: React.Dispatch<React.SetStateAction<any>> }) => void
}

export interface Values {
  proposta: string,
  data: string,
  cnpj: string,
  nomeEmpresa: string,
  razao: string,
  potencia: string,
  valorContaEnergia: string,
  vendedor: string,
  departamentoVendedor: string,
  telefoneVendedor: string,
  emailVendedor: string,
  tomador: string,
  departamentoTomador: string,
  telefoneTomador: string,
  emailTomador: string,
  valor: number
}