export interface Order {
    OrderDate: string,
    OrderId: number,
    PaymentType: string,
    Products: ProductFlag[],
    UserId: string,
    rating:3
}

export interface ProductFlag {
    ProductId: number,
    Quantity: number
}