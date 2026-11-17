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
import { useAuthStore } from '@/lib/store/authStore';
import { useCartStore } from '@/lib/store/cartStore';
import { toast } from 'sonner';
import axios from 'axios';

export default function ProfileClientPage() {
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [orders, setOrders] = useState<OrderProps[]>([])

  const router = useRouter();
  const clearUser = useAuthStore((state) => state.clearUser);
  const clearCart = useCartStore((state) => state.clearCart);

  const clearSessionAndRedirect = async () => {
    try {
      await logout();
    } catch {

    }
    clearUser();
    router.replace("/");
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
      setIsLoading(true)
      const data = await getUserOrders()
      if (!data || data.length === 0) {
        setIsEmpty(true)
      }
      setOrders((data))
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          toast.error('сессія закінчилась, увійдіть знову')
          await clearSessionAndRedirect();
        }
        setIsError(true)
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
    try {
      await logout();
    } catch {
      toast.error('Сесія вже завершена');
    }
    clearUser();
    clearCart();
    router.push('/');
  };

  return (
    <div className={`container page ${css.page}`}>
      <h1 className="pageTitle">Кабінет</h1>
      <div className={css.wrapper}>
        <div className={css.itemA}>
        <h2 className={css.ordersTitle}>Мої замовлення</h2>
        {isLoading ? <Loader /> :
          isError ? <h2 className={css.error}>Виникла помилка при спробі завантажити ваші закази</h2> :
          !isEmpty ? <OrdersList orders={orders} /> :
            <MessageNoInfo message="У вас ще не було жодних замовлень! Мершій до покупок!" buttonText="До покупок" onClick={handleClick} />
          }
        </div>
        <div className={css.itemB}>
          <UserInfoForm />
          </div>
      </div>
      <button className={css.button} onClick={handleLogout}>Вийти з кабінету</button>
    </div>
  );
}
