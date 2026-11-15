import { OrderListProps, OrderProps } from '@/types/orderList';
import css from './OrdersList.module.css';

export default function OrdersList({orders}: OrderListProps) {
  return (
    <section className={css.ordersList}>
    <div className={css.generalWrapper}>
      <h1 className={css.h1}>Мої замовлення</h1>
        <div className={css.outerWrapper}>
          {orders.map((order: OrderProps) => (
            <div key={order._id}>
        <div className={css.innerWrapper}>
          <p>{order.date}</p>
          <p className={css.bigText}>{order.number}</p>
        </div>
        <div className={css.innerWrapper}>
          <p className={css.bigText}>Сума</p>
          <p>{order.price}</p>
        </div>
        <div className={css.innerWrapper}>
          <p className={css.bigText}>Статус</p>
          <p>{order.status}</p>
              </div>
            </div>
            ))}
      </div>
    </div>
  </section>
  )
}