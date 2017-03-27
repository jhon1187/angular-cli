import { Cartao } from "app/matricula/components/objects/cartao";

export class Matricula {
  matriculaId: string;
  turmaId: string;
  alunoId: string;
  formaPagamento: number;
  quantidadeParcelas : number;
  cartao : Cartao;
  origem: number = 1;
}