import GoodsOrderList from '@/components/GoodsOrderList/GoodsOrderList';
import CreateOrderForm from '@/components/CreateOrderForm/CreateOrderForm';

export default function CreateOrderPage() {
  return (
    <div className="container page">
      <h1 className="pageTitle">Оформити замовлення</h1>
      <GoodsOrderList />
      <CreateOrderForm />
    </div>
  );
}
