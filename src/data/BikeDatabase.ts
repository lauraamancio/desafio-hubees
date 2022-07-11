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

    public async deleteBike(id: string): Promise<void> {
        try {
            await BaseDatabase.connection(this.TABLE_NAME)
            .delete()
            .where({id})
        } catch (error: any) {
            throw new Error(error.sqlmessage || error.message)
        }
    }

    public async changePrice(price: inputChangePriceDTO, id: string): Promise<void> {
        try {
            await BaseDatabase.connection(this.TABLE_NAME)
            .update(price)
            .where({id})
        } catch (error: any) {
            throw new Error(error.sqlmessage || error.message)
        }
    }

    public async getAllBikes(): Promise<BikeModel[]>{
        try {
            const result = await BaseDatabase.connection(this.TABLE_NAME)
            .select('*')
            return result
        } catch (error: any) {
            throw new Error(error.sqlmessage || error.message)
        }
    }

    public async getByColor(color: string): Promise<BikeModel[]> {
        try {
            const result = await BaseDatabase.connection(this.TABLE_NAME)
            .select('*')
            .where('color', 'like', `%${color}%`)
            return result
        } catch (error: any) {
            throw new Error(error.sqlmessage || error.message)
        }
    }

    public async getByValue(): Promise<BikeModel[]> {
        try {
            const result = await BaseDatabase.connection(this.TABLE_NAME)
            .select('*')
            .orderBy('price', 'ASC')
            return result
        } catch (error: any) {
            throw new Error(error.sqlmessage || error.message)
        }
    }
}