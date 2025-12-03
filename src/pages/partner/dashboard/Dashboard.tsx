import {
  useGetMyAssignedOrdersQuery,
  useGetOrdersByLocationQuery,
} from "@features/api";
import { PartnerOrderList } from "./PartnerOrderList";

export const Dashboard = () => {
  const { data: OrdersByLocation, isLoading } = useGetOrdersByLocationQuery();
  const { data: myOrders } = useGetMyAssignedOrdersQuery();
  console.log("OrdersByLocation", OrdersByLocation);
  console.log("myOrders", myOrders);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <PartnerOrderList orders={OrdersByLocation?.orders} />
    </div>
  );
};
