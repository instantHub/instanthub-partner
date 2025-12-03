import { Truck } from "lucide-react";
import { OrderCard } from "./OrderCard";
import { IUnAssignedOrder } from "@features/api/orders/types";
import { useAssignOrderToPartnerMutation } from "@features/api";
import { toast } from "react-toastify";

export const PartnerOrderList: React.FC<{
  orders: IUnAssignedOrder[] | undefined;
}> = ({ orders }) => {
  const [assignOrderToPartner, { isLoading: loadingAssignment }] =
    useAssignOrderToPartnerMutation();

  const handleApprove = async (orderId: string) => {
    console.log(`Approving order: ${orderId}`);
    // Add your API call logic here (e.g., dispatch an action, call a mutation)
    alert(`Order ${orderId} is now set for approval!`);

    const updatedOrderData = await assignOrderToPartner({
      orderId: orderId,
    }).unwrap();

    // window.location.reload();

    toast.success(updatedOrderData.message);
  };

  if (!orders) return <div>No Orders to display..!</div>;

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Local Orders ({orders.length})
      </h2>

      {orders.length === 0 ? (
        <div className="text-center p-10 bg-white rounded-xl shadow-md text-gray-500">
          <Truck className="w-8 h-8 mx-auto mb-3" />
          <p>No new orders found in your city.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard
              key={order.orderId}
              order={order}
              onApprove={handleApprove}
            />
          ))}
        </div>
      )}
    </div>
  );
};
