import OrdersList from '@/components/OrdersList/OrdersList';
import UserInfoForm from '@/components/UserInfoForm/UserInfoForm';

export default function ProfilePage() {
  return (
    <div className="container page">
      <h1 className="pageTitle">Кабінет</h1>
      <OrdersList />
      <UserInfoForm />
    </div>
  );
}
