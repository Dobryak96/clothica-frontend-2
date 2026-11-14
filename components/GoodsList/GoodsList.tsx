import GoodInfo from '@/components/GoodInfo/GoodInfo';
import Loader from '@/components/Loader/Loader';
import MessageNoInfo from '@/components/MessageNoInfo/MessageNoInfo';
import type { Good } from '@/types/good';
import css from './GoodsList.module.css';

type GoodsListProps = {
  goods: Good[];
  isLoading: boolean;
  isError: boolean;
  onReset: () => void;
  onRetry: () => void;
};

export default function GoodsList({ goods, isLoading, isError, onReset, onRetry }: GoodsListProps) {
  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <MessageNoInfo
        message="Не вдалося завантажити товари. Спробуйте ще раз"
        buttonText="Оновити"
        onClick={onRetry}
      />
    );
  }

  if (goods.length === 0) {
    return (
      <MessageNoInfo
        message="За вашим запитом не знайдено жодного товару"
        buttonText="Скинути фільтри"
        onClick={onReset}
      />
    );
  }

  return (
    <ul className={css.list}>
      {goods.map((good) => (
        <li key={good._id}>
          <GoodInfo good={good} />
        </li>
      ))}
    </ul>
  );
}
