import { model, Schema } from "mongoose";
import { IProperty } from "../interfaces/IProperty";

const PropertySchema = new Schema<IProperty>({
  titulo: String,
  numeroSuites: Number,
  numeroBanheiros: Number,
  valorIPTUTratado: Number,
  areaTotal: Number,
  tiposNegocio: [String],
  valorCondominioTratado: Number,
  numeroQuartos: Number,
  dataUltimaAtualizacao: Date,
  id: String,
  dataCadastro: Date,
  areaUtil: Number,
  linkOriginal: String,
  outrasCaracteristicas: {
    caracteristicas: [String],
  },
  categoria: [String],
  valor: String,
  enderecoSite: {
    uf: String,
    cidade: String,
    endereco: String,
    bairro: String,
    geoLocalizacao: {
      lon: { type: Number, default: null },
      lat: { type: Number, default: null },
    },
    rua: String,
    cep: String,
  },
  nomeProprietario: String,
  valorCondominio: String,
  descricao: String,
  valorTratado: Number,
  tipoImovel: String,
  codigoOrigem: String,
  tipoAnunciante: String,
  statusAnuncio: String,
  vagasGaragem: Number,
  valorIPTU: String,
  tags: [String],
});

const PropertyModel = model<IProperty>("Property", PropertySchema);

export default PropertyModel;
