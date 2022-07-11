import app from "./app";
import BikeBusiness from "./business/BikeBusiness";
import BikeController from "./controller/BikeController";
import BikeDatabase from "./data/BikeDatabase";
import { IdGenerator } from "./services/IdGenerate";

const bikeBusiness = new BikeBusiness(
    new IdGenerator(),
    new BikeDatabase()
)
const bikeController = new BikeController(bikeBusiness)

app.post("/bikes/cadastro", bikeController.addBike)
app.delete("/bikes/:id", bikeController.deleteBike)
app.put("/bikes/detalhes/:id", bikeController.changePrice)
app.get("/bikes", bikeController.getAllProducts)
app.get("/bikes/:color", bikeController.getByColor)
app.get("/bikes/valores/crescente", bikeController.getByValue)