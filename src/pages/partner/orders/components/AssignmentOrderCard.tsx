import { IOrder } from "@features/api/orders/types";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  IndianRupee,
  Loader2,
  Mail,
  MapPin,
  Package,
  Phone,
  User,
} from "lucide-react";

interface OrderCardProps {
  order: IOrder;
  onApprove: (id: string) => void;
  isApproving?: boolean;
}

export const AssignmentOrderCard: React.FC<OrderCardProps> = ({
  order,
  onApprove,
  isApproving,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const statusConfig = {
    pending: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      border: "border-amber-200",
      dot: "bg-amber-500",
    },
    "in-progress": {
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-200",
      dot: "bg-blue-500",
    },
    completed: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      border: "border-emerald-200",
      dot: "bg-emerald-500",
    },
    cancelled: {
      bg: "bg-red-50",
      text: "text-red-700",
      border: "border-red-200",
      dot: "bg-red-500",
    },
  };

  const status = statusConfig[order.status];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {/* Accent Top Bar */}
      <div className="h-1 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500" />

      <div className="flex flex-col gap-3 p-4">
        {/* Header Row */}
        {/* <div className="flex items-start justify-between border-b border-b-gray-200 pb-2 mb-4"> */}
        <div className="grid grid-cols-2 sm:grid-cols-3 items-start justify-between border-b border-b-gray-200 pb-2 mb-4">
          <div className="sm:block hidden text-base">
            <div className="font-bold text-start text-gray-900 truncate">
              {order.productDetails.productName}{" "}
              {order.productDetails.variant?.variantName || "Standard"}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
              Order ID
            </p>
            <h3 className="font-mono font-bold text-gray-900 text-sm">
              {order.orderId}
            </h3>
          </div>
          <div className="flex w-full justify-end">
            <div
              className={`w-fit flex items-center gap-1.5 px-2.5 py-1 rounded-full ${status.bg} ${status.border} border`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
              <span
                className={`text-[10px] font-bold uppercase ${status.text}`}
              >
                {order.status}
              </span>
            </div>
          </div>
        </div>

        {/* Product Info */}
        {/* TODO: add selected processor name beside laptop names */}
        <div className="sm:hidden flex items-center justify-between text-sm gap-3 p-3 bg-linear-to-br from-gray-50 to-gray-100/50 rounded-xl mb-4">
          <div className="flex flex-col items-start min-w-0">
            <h4 className="font-bold text-gray-900 truncate">
              {order.productDetails.productName}
            </h4>
            <p className="text-gray-500">
              {order.productDetails.variant?.variantName || "Standard"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Price</p>
            <p className="font-bold text-gray-900 flex items-center">
              <IndianRupee className="w-3.5 h-3.5" />
              {order.finalPrice || order.offerPrice}
            </p>
          </div>
        </div>

        {/* Customer & Schedule Info */}
        <div className="space-y-2.5 mb-4 mx-2 sm:mx-4 text-sm sm:text-base">
          {/* Customer */}
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 flex-col sm:flex-row">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-purple-600" />{" "}
              {order.customerDetails.name}
            </div>

            {/* <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-600" />{" "}
              <a
                href={`tel:${order.customerDetails.phone}`}
                className="text-blue-700 underline"
              >
                {order.customerDetails.phone}
              </a>
            </div>
            <div className="flex items-center gap-2 col-span-2">
              <Mail className="w-4 h-4 text-red-600" />{" "}
              {order.customerDetails.email}
            </div> */}

            {/* <span className="max-sm:hidden">|</span> */}
            <div className="flex items-center gap-2 col-span-2">
              <MapPin className="w-4 h-4 text-green-600" />
              {order.customerDetails.addressDetails.address},{" "}
              {order.customerDetails.addressDetails.pinCode}
            </div>
          </div>

          {/* Schedule */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <div>{formatDate(order.schedulePickUp.date.toString())} </div>
            <span>-</span>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {order.schedulePickUp.timeSlot}
            </div>
          </div>
        </div>

        {/* Action Button */}
        {(order.status === "pending" || order.status === "in-progress") && (
          <button
            onClick={() => onApprove(order.id)}
            disabled={isApproving}
            // className="w-full py-3.5 px-4 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-gray-900/20"
            className="text-sm sm:text-base w-full py-3.5 px-4 
                bg-linear-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white 
                flex items-center justify-between max-sm:justify-center gap-2 font-semibold rounded-xl 
                transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-gray-900/20"
          >
            <div className="sm:block hidden"></div>
            {isApproving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-5 h-5" />
                <span>Approve Pickup</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            )}
            <div className="max-sm:hidden flex items-center gap-2">
              <p>Offer Price</p>
              <p className="font-bold flex items-center">
                <IndianRupee className="w-3.5 h-3.5" />
                {order.offerPrice} /-
              </p>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};
