import { TipoFormaPagamento } from "app/matricula/components/entities/tipo-forma-pagamento";

export class FormaPagamento {
  id: number;
  tipo: TipoFormaPagamento;
  parcelas: number;
}
