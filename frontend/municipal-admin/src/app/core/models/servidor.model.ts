import { Secretaria } from './secretaria.model';

export interface Servidor {
  id?: number;
  nome: string;
  email: string;
  dataNascimento: string;   // ISO (yyyy-MM-dd)
  secretariaId: number;     // referência por id
  secretaria?: Secretaria;  // opcional para listagem expandida
}