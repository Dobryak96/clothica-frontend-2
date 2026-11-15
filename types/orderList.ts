export interface OrderProps {
  date: string,
  number: string,
  price: number,
  status: string,
  _id: string, 
}

export interface OrderListProps {
    orders: OrderProps[]
}