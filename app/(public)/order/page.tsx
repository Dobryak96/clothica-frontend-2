import type { Metadata } from 'next';
import GoodsOrderList from '@/components/GoodsOrderList/GoodsOrderList';
import CreateOrderForm from '@/components/CreateOrderForm/CreateOrderForm';
import css from './order.module.css';

export const metadata: Metadata = {
  title: 'Оформлення замовлення | Clothica',
};

export default function CreateOrderPage() {
  return (
    <section className={css.section}>
      <div className={`container ${css.content}`}>
        <h1 className="pageTitle">Оформити замовлення</h1>

        <div className={css.layout}>
          <div className={`${css.block} ${css.goods}`}>
            <h2 className={css.blockTitle}>Товари</h2>
            <GoodsOrderList />
          </div>

          <div className={`${css.block} ${css.personal}`}>
            <h2 className={css.blockTitle}>Особиста інформація</h2>
            <CreateOrderForm />
          </div>
        </div>
      </div>
    </section>
  );
}
