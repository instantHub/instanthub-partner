import React, { useState, useMemo } from "react";
import { XCircle } from "lucide-react";
import {
  useAssignOrderToPartnerMutation,
  useGetOrderStatsQuery,
} from "@features/api";
import { TFilterTab } from "@features/api/orders/types";
import {
  FilterTabs,
  AssignmentOrderCard,
  EmptyState,
  ErrorState,
} from "./components";
import { Loading } from "@components/general";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUserState } from "@features/slices";
import { IPartner } from "@features/api/auth/types";
import { AVAILABLE_ROLE } from "@utils/constants";

export const OrdersAwaitingAssignment: React.FC = () => {
  const { user } = useSelector(selectUserState);
  console.log("user", user);

  const { data: statsResponse, isLoading, isError } = useGetOrderStatsQuery();
  console.log("statsResponse", statsResponse);

  const [assignOrder, { isLoading: assignmentLoading }] =
    useAssignOrderToPartnerMutation();

  const [activeFilter, setActiveFilter] = useState<TFilterTab>("all");
  const [approvingId, setApprovingId] = useState<string | null>(null);

  // Get the correct order list based on filter
  const currentOrders = useMemo(() => {
    if (!statsResponse?.data) return [];

    switch (activeFilter) {
      case "today":
        return statsResponse.data.today.available || [];
      case "tomorrow":
        return statsResponse.data.tomorrow.available || [];
      default:
        return statsResponse.data.available.total || [];
    }
  }, [activeFilter, statsResponse]);

  // Tab counts
  const tabCounts = useMemo(() => {
    if (!statsResponse?.data) return { all: 0, today: 0, tomorrow: 0 };

    return {
      all: statsResponse.data.available.total?.length || 0,
      today: statsResponse.data.today.available?.length || 0,
      tomorrow: statsResponse.data.tomorrow.available?.length || 0,
    };
  }, [statsResponse]);

  const handleApprove = async (_orderId: string) => {
    setApprovingId(_orderId);
    try {
      const updatedOrderData = await assignOrder({
        _orderId,
        _userId: user?._id!,
        userRole: AVAILABLE_ROLE.PARTNER,
        assignmentStatus: {
          assigned: true,
          assignedTo: {
            name: String(user?.name),
            phone: String(user?.phone),
            role: AVAILABLE_ROLE.PARTNER,
            id: (user as IPartner).partnerID,
          },
          assignedBy: {
            name: user?.name!,
            role: "partner",
          },
          assignedAt: new Date().toISOString(),
        },
      }).unwrap();
      toast.success(updatedOrderData.message);
    } finally {
      setApprovingId(null);
    }
  };

  if (isLoading) return <Loading />;

  if (isError || !statsResponse?.data) return <ErrorState />;

  return (
    <div className="min-h-screen bg-gray-50 pb-24 px-4 mt-6">
      <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
        <span className="w-1 h-5 bg-indigo-600 rounded-full" />
        Available for Pickup
      </h2>
      <p className="text-sm text-gray-500 mt-1 mb-2">
        Orders in your area waiting to be assigned
      </p>

      {/* Filter Tabs */}
      <FilterTabs
        activeTab={activeFilter}
        onTabChange={setActiveFilter}
        counts={tabCounts}
      />

      {/* Orders List */}
      <div className="space-y-4 mt-4">
        {currentOrders.length === 0 ? (
          <EmptyState filter={activeFilter} />
        ) : (
          currentOrders?.map((order) => (
            <AssignmentOrderCard
              key={order.id || order.orderId}
              order={order}
              onApprove={handleApprove}
              isApproving={approvingId === order.id}
            />
          ))
        )}
      </div>
    </div>
  );
};
