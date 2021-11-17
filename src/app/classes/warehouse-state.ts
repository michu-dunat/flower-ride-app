export class WarehouseState {
    id: number | undefined;
    name: string;
    pricePerPiece: number;
    amount: number;
    isFlower: boolean;

    constructor(name: string, pricePerPiece: number, amount: number, isFlower: boolean) {
        this.name = name;
        this.pricePerPiece = pricePerPiece;
        this.amount = amount;
        this.isFlower = isFlower;
    }
}
