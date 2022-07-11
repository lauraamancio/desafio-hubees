import {
  BikeModel,
  inputAddBikeDTO,
  inputChangePriceDTO,
} from "./../models/BikeModel";
import { IdGenerator } from "../services/IdGenerate";
import BikeDatabase from "../data/BikeDatabase";
import { CustomError } from "./Errors/CustomError";

export default class BikeBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private bikeData: BikeDatabase
  ) {}

  public addBike = async (input: inputAddBikeDTO) => {
    try {
      const { color, brand, gear_speed, model, price } = input;

      if (!color || !gear_speed || !brand || !model || !price) {
        throw new CustomError(400, "Preencha todos os campos corretamente");
      }

      const id: string = this.idGenerator.generateId();

      const newBike = new BikeModel(id, color, brand, gear_speed, model, price);

      await this.bikeData.addBike(newBike);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  public deleteBike = async (id: string) => {
    try {
      const idBike = id;

      if (!idBike) {
        throw new CustomError(404, "Id não encontrado/informado");
      }
      await this.bikeData.deleteBike(idBike);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  public changePrice = async (input: inputChangePriceDTO, id: string) => {
    try {
      const newPrice = input;
      const idBike = id;

      if (!newPrice || !idBike) {
        throw new CustomError(
          422,
          "informe corretamente os valores que quer alterar"
        );
      }

      await this.bikeData.changePrice(newPrice, idBike);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  public getAllProducts = async () => {
    try {
      const result = await this.bikeData.getAllBikes();
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  public getByColor = async (param: string) => {
    try {
      const color = param;
      if (!color) {
        throw new CustomError(422, "digite uma cor para filtrar");
      }
      const result = await this.bikeData.getByColor(color);
      if (result.length === 0) {
        throw new CustomError(404, "Não temos bicicletas desta cor");
      }
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  public getByValue = async () => {
    try {
      const result = await this.bikeData.getByValue();
      if (result.length === 0) {
        throw new CustomError(404, "Estamos sem Bikes no momento");
      }
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}
