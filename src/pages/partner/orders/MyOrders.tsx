import { Loading } from "@components/general";
import { useGetMyAssignedOrdersQuery } from "@features/api";
import { ErrorState, OrderCard } from "./components";

export const MyOrders = () => {
  const { data: myOrders, isLoading, isError } = useGetMyAssignedOrdersQuery();
  console.log("myOrders", myOrders);

  if (isLoading) return <Loading />;

  if (isError || !myOrders?.data) return <ErrorState />;

  return (
    <div className="space-y-4 mt-4 mx-4">
      <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
        <span className="w-1 h-5 bg-indigo-600 rounded-full" />
        My Orders
      </h2>

      {myOrders.data.map((order) => (
        <OrderCard
          key={order.id || order.orderId}
          order={order}
          onApprove={() => {}}
        />
      ))}
    </div>
  );
};
