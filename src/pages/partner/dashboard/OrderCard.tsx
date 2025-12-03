import { Button, FlexBox } from "@components/general";
import { IUnAssignedOrder } from "@features/api/orders/types";
import { ORDER_STATUS } from "@utils/constants";
import { AtSign, CheckCircle, Clock, DollarSign, MapPin } from "lucide-react";

const formatDate = (isoDate: string | Date) => {
  // Example: "Nov 15, 2025"
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const OrderCard: React.FC<{
  order: IUnAssignedOrder;
  onApprove: (id: string) => void;
}> = ({ order, onApprove }) => {
  // Determine status color and icon

  // Unique Card Design: Rounded, elevated, and color-coded border
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-5 transition duration-300 ease-in-out hover:shadow-xl">
      {/* TOP HEADER - Order ID and Status */}
      <div
        className={`p-4 flex justify-between items-center bg-yellow-100 text-yellow-800 border-yellow-400 border-b`}
      >
        <h3 className="font-semibold text-sm">
          ORDER ID: <span className="font-bold">{order.orderId}</span>
        </h3>
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full uppercase`}
        >
          {order.status}
        </span>
      </div>

      <div className="p-4 space-y-3">
        {/* 1. PRODUCT & PRICE ROW - Main Focus */}
        <FlexBox
          justify="between"
          className="gap-2 pb-2 border-b border-gray-100 max-md:flex-col"
        >
          <p className="text-base font-bold text-gray-800">
            {order.productName} ({order.variantName})
          </p>
          <p className="text-base font-bold text-gray-800">
            {order.customerName} | {order.customerPhone} | {order.customerEmail}
          </p>
        </FlexBox>

        <FlexBox
          justify="between"
          className="text-sm font-semibold text-gray-600 max-md:flex-col"
        >
          {/* 2. SCHEDULE ROW - Date and Time */}
          <div className="flex gap-2 items-center">
            <FlexBox gap={1}>
              <Clock className="w-5 h-5 text-green-500" />
              <span>{formatDate(order.scheduledDate)}</span>
            </FlexBox>
            <FlexBox gap={1}>
              <AtSign className="w-5 h-5 text-green-500" />{" "}
              <span>{order.timeSlot}</span>
            </FlexBox>
          </div>

          {/* 3. LOCATION ROW - Address Snippet */}
          <FlexBox className="pt-1">
            <MapPin className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
            <span>
              {order.customerAddress}, {order.customerCity} -{" "}
              {order.customerPinCode}
            </span>
          </FlexBox>
        </FlexBox>

        {/* 4. ACTION BUTTON - Conditional Display */}
        {order.status === "pending" && (
          <Button
            leftIcon={<CheckCircle className="w-5 h-5 mr-2" />}
            onClick={() => onApprove(order._id)}
            fullWidth
          >
            Approve Pickup
          </Button>
        )}
      </div>
    </div>
  );
};
