export class BikeModel {
  constructor(
    private id: string,
    private color: string,
    private brand: string,
    private gear_speed: number,
    private model: string,
    private price: number
  ) {}
}

export interface inputAddBikeDTO {
  color: string;
  gear_speed: number;
  brand: string;
  model: string;
  price: number;
}

export interface inputChangePriceDTO {
  price: number;
}
