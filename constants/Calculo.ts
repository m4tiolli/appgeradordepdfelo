import React from "react";
import { FatoresFinanceiros, FormData } from "../interfaces/Formulario";

interface CalcularValorTotal {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  mesesFatorFinanceiro: FatoresFinanceiros[] | undefined;
}

export const calcularValorTotal = ({
  formData,
  setFormData,
  mesesFatorFinanceiro,
}: CalcularValorTotal) => {
  const potencia = formData.potencia as number;
  const contaEnergia = formData.valorContaEnergia as number;
  const fator = mesesFatorFinanceiro?.find(
    (mes) => mes.meses === parseInt(formData.fatorFinanceiroMes as string)
  )?.porcentagem;
  if (potencia * (fator as number) < (contaEnergia / 100) * 5) {
    setFormData((prev) => ({
      ...prev,
      valor: (contaEnergia / 100) * 5,
    }));
  } else if (potencia * (fator as number) > (contaEnergia / 100) * 10) {
    setFormData((prev) => ({
      ...prev,
      valor: (contaEnergia / 100) * 10,
    }));
  } else {
    setFormData((prev) => ({
      ...prev,
      valor: potencia * (fator as number),
    }));
  }
};