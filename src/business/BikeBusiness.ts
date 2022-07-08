import { BikeModel, inputAddBikeDTO, inputChangePriceDTO } from "./../models/BikeModel";
import { IdGenerator } from "../services/IdGenerate";
import BikeDatabase from "../data/BikeDatabase";

export default class BikeBusiness {
    constructor(
        private idGenerator: IdGenerator,
        private bikeData: BikeDatabase
    ){}

    public addBike = async(input: inputAddBikeDTO) => {
        try {
            const {color, brand, gear_speed, model, price} = input

            if(!color || !gear_speed || !brand || !model || !price) {
                throw new Error("Preencha todos os campos corretamente")
            }
            
            const id: string = this.idGenerator.generateId()

            const newBike = new BikeModel(
                id,
                color,
                brand,
                gear_speed,
                model,
                price
            )

            await this.bikeData.addBike(newBike)
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public deleteBike = async(id: string) =>{
        try {
            const idBike = id

            if(!idBike){
                throw new Error("Id não informado")
            }
            await this.bikeData.deleteBike(idBike)
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public changePrice = async(input: inputChangePriceDTO, id: string) => {
        try {
            const newPrice = input
            const idBike = id

            if(!newPrice || !idBike){
                throw new Error("informe corretamente os valores que quer alterar")
            }
            

            await this.bikeData.changePrice(newPrice, idBike)

        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}