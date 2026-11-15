import css from './BasketModal.module.css';
import { OrderData } from '../GoodForPurchase/GoodForPurchase';

interface BasketModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderData[];
}

export default function BasketModal({ isOpen, onClose, items }: BasketModalProps) {
  if (!isOpen) return null;

  return (
    <div className={css.overlay}>
      <section className={`placeholder ${css.basketModal}`}>
        <div className={css.header}>
          <h2>Кошик</h2>
          <button type="button" onClick={onClose} className={css.closeBtn}>
            &times;
          </button>
        </div>

        <div className={css.content}>
          {items.length === 0 ? (
            <p>Ваш кошик порожній</p>
          ) : (
            <ul>
              {items.map((item, index) => (
                <li key={index} className={css.item}>
                  <span>{item.name}</span>
                  <span>Розмір: {item.size || "—"}</span>
                  <span>Кількість: {item.quantity} шт.</span>
                  <span>{item.totalPrice} грн</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}