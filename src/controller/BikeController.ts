import { Request, Response } from "express";
import BikeBusiness from "../business/BikeBusiness";
import { inputAddBikeDTO } from "../models/BikeModel";

export default class BikeController {
  constructor(private bikeBusiness: BikeBusiness) {}

  public addBike = async (req: Request, res: Response) => {
    try {
      const { color, brand, gear_speed, model, price } = req.body;

      const input: inputAddBikeDTO = {
        color,
        brand,
        gear_speed,
        model,
        price,
      };

      await this.bikeBusiness.addBike(input);

      res.status(201).send({ message: "Bicicleta cadastrada com sucesso" });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  public deleteBike = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      await this.bikeBusiness.deleteBike(id);

      res.status(200).send({ message: "Bicicleta deletada com sucesso" });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  public changePrice = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const newPrice = req.body;

      await this.bikeBusiness.changePrice(newPrice, id);

      res.status(200).send({ message: "Preço atualizado com sucesso" });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  public getAllProducts = async (req: Request, res: Response) => {
    try {
      const result = await this.bikeBusiness.getAllProducts();

      res.status(200).send(result);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  public getByColor = async (req: Request, res: Response) => {
    try {
      const input = req.params.color;

      const result = await this.bikeBusiness.getByColor(input);

      res.status(200).send(result);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  public getByValue = async (req: Request, res: Response) => {
    try {
      const result = await this.bikeBusiness.getByValue();

      res.status(200).send(result);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };
}
