export interface OrderProps {
  createdAt: string,
  number: string,
  total: number,
  status: string,
  _id: string, 
}

export interface OrderListProps {
    orders: OrderProps[]
}