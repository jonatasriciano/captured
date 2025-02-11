import { Document } from 'mongoose';

export interface IProperty extends Document {
  titulo: string;
  numeroSuites: number;
  numeroBanheiros: number;
  valorIPTUTratado: number;
  areaTotal: number;
  tiposNegocio: string[];
  valorCondominioTratado: number;
  numeroQuartos: number;
  dataUltimaAtualizacao: Date;
  id: string;
  dataCadastro: Date;
  areaUtil: number;
  linkOriginal: string;
  outrasCaracteristicas: {
    caracteristicas: string[];
  };
  categoria: string[];
  valor: string;
  enderecoSite: {
    uf: string;
    cidade: string;
    endereco: string;
    bairro: string;
    geoLocalizacao: {
      lon: number | null;
      lat: number | null;
    };
    rua: string;
    cep: string;
  };
  nomeProprietario: string;
  valorCondominio: string;
  descricao: string;
  valorTratado: number;
  tipoImovel: string;
  codigoOrigem: string;
  tipoAnunciante: string;
  statusAnuncio: string;
  vagasGaragem: number;
  valorIPTU: string;
  // Our new tags field
  tags?: string[];
}