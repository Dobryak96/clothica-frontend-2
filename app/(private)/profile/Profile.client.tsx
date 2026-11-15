'use client';

import OrdersList from '@/components/OrdersList/OrdersList';
import UserInfoForm from '@/components/UserInfoForm/UserInfoForm';
import css from './profile.module.css';
import { useEffect, useState } from 'react';
import MessageNoInfo from '@/components/MessageNoInfo/MessageNoInfo';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/api/logoutApi';
import { getUserOrders } from '@/lib/api/userOrdersApi';
import { OrderProps } from '@/types/orderList';
import Loader from '@/components/Loader/Loader';

export default function ProfileClientPage() {
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [orders, setOrders] = useState<OrderProps[]>([])
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
      setIsLoading(true)
      const data = await getUserOrders()
      if (!data || data.lenght === 0) {
        setIsEmpty(true)
      }
      setOrders((data))
      } catch (error) {
        setIsError(true)
        console.log(error);
        throw new Error(`error have occured: ${error}`)
      } finally {
        setIsLoading(false)
      }
    }
    fetchOrders();
  }, [])
  const handleClick = () => {
    router.push("/goods")
  }
  const handleLogout = async () => {
    await logout();
    router.push("/")
    router.refresh()
  }

  return (
    <div className={`container page ${css.page}`}>
      <h1 className="pageTitle">Кабінет</h1>
      <div className={css.wrapper}>
        {isLoading ? <Loader /> :
          isError ? <h2 className={css.error}>Виникла помилка при спробі завантажити ваші закази</h2> :
          !isEmpty ? <OrdersList orders={orders} /> :
            <MessageNoInfo message="У вас ще не було жодних замовлень! Мершій до покупок!" buttonText="До покупок" onClick={handleClick} />
        }
        <UserInfoForm />
      </div>
      <button className={css.button} onClick={handleLogout}>Вийти з кабінету</button>
    </div>
  );
}
