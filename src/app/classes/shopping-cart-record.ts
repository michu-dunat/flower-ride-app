import { WarehouseState } from "./warehouse-state";

export class ShoppingCartRecord {
    warehouseState: WarehouseState
    amountToBuy: number

    constructor(warehouseState: WarehouseState, amountToBuy: number) {
        this.warehouseState = warehouseState
        this.amountToBuy = amountToBuy
    }
}
