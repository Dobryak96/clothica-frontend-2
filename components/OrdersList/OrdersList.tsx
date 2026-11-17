import { OrderListProps, OrderProps } from '@/types/orderList';
import css from './OrdersList.module.css';

const STATUS_LABELS: Record<string, string> = {
  pending: 'У процесі',
  processing: 'Комплектується',
  completed: 'Виконано',
  cancelled: 'Скасовано',
};

export default function OrdersList({ orders }: OrderListProps) {
  return (
    <ul className={css.ordersList}>
      {orders.map((order: OrderProps) => (
        <li key={order._id} className={css.order}>
          <div className={css.cell}>
            <p className={css.date}>{new Date(order.createdAt).toLocaleDateString('uk-UA')}</p>
            <p className={css.number}>№{order.number}</p>
          </div>
          <div className={css.cell}>
            <p className={css.label}>Сума:</p>
            <p className={css.value}>{order.total} грн</p>
          </div>
          <div className={css.cell}>
            <p className={css.label}>Статус:</p>
            <p className={css.value}>{STATUS_LABELS[order.status] ?? order.status}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
