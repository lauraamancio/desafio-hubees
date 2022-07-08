import { inputChangePriceDTO } from "./../models/BikeModel";
import {BikeModel} from "../models/BikeModel"
import { BaseDatabase } from "./BaseDatabase"

export default class BikeDatabase extends BaseDatabase {
    protected TABLE_NAME = "Bikes_Hubees"

    public async addBike(input: BikeModel) {
        try {
            await BaseDatabase.connection(this.TABLE_NAME)
            .insert(input)
        } catch (error: any) {
            throw new Error(error.sqlmessage || error.message)
        }
    }

    public async deleteBike(id: string) {
        try {
            await BaseDatabase.connection(this.TABLE_NAME)
            .delete()
            .where({id})
        } catch (error: any) {
            throw new Error(error.sqlmessage || error.message)
        }
    }

    public async changePrice(price: inputChangePriceDTO, id: string) {
        try {
            await BaseDatabase.connection(this.TABLE_NAME)
            .update(price)
            .where({id})
        } catch (error: any) {
            throw new Error(error.sqlmessage || error.message)
        }
    }
}