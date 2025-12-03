import {
  ASSIGNMENT_STATUS,
  ORDER_STATUS,
  TOperation,
  AVAILABLE_ROLE,
  TAvailableRole,
} from "@utils/constants";

/**
 * UnAssigned Order details
 */
export interface IUnAssignedOrder {
  _id: string;
  createdAt: Date;

  orderId: string;

  status: ORDER_STATUS;
  offerPrice: number;

  // Customer details
  customerName: string;
  customerEmail: string;
  customerPhone: number;
  customerAddress: string;
  customerCity: string;
  customerState: string;
  customerPinCode: number;

  // Product details
  productName: string;
  productBrand: string;
  productCategory: string;
  variantName: string;

  // Schedule details
  scheduledDate: Date;
  timeSlot: string;
}

/**
 * Full Order details
 */

export interface IOrder {
  id: string;
  orderId: string;
  customer: ICustomerDetails;
  product: IProductDetails;
  device: IDeviceInfo;
  status: ORDER_STATUS;
  isOverdue: boolean;
  scheduledDate: string;
  timeSlot: string;
  offerPrice: number;
  finalPrice: number;
  paymentMode: string;
  assignment: IAssignmentDetails;
  reschedule: IRescheduleDetails;
  cancellation: ICancellationDetails | null;
  createdAt: string;
  completedAt: string | null;
}

export interface ICustomerDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
}

export interface IProductDetails {
  name: string;
  brand: string;
  category: string;
  variant: string;
  variantPrice: number;
}

export interface IAssignmentDetails {
  isAssigned: boolean;
  assignedTo: string | null;
  assignedToPhone: string | null;
  assignedToRole: string | null;
  assignedAt: string | null;
  assignedBy: string | null;
}

export interface IRescheduleDetails {
  isRescheduled: boolean;
  rescheduleCount: number;
  rescheduleReason: string | null;
  lastRescheduledDate: string | null;
}

export interface ICancellationDetails {
  cancelledBy: string | null;
  cancelReason: string | null;
  cancelledAt: string | null;
}

export interface IDeviceInfo {
  serialNumber: string;
  imeiNumber: string;
}

// Actual BE stored assignment model
export interface IAssignmentStatus {
  assigned: boolean;
  assignedAt: string;

  assignedTo: {
    name: string;
    phone: string;
    role: TAvailableRole;
  };
  assignedBy: {
    name: string;
    role: "admin" | "partner";
  };
}

// Unknown yet
export interface IFinalDeductionSet {
  type: string;
  conditions: IFDSetCondition[];
}

export interface IFDSetCondition {
  conditionLabel: string;
  operation: TOperation;
  priceDrop: number;
  type: string;
}

export interface IPickedUpDetails {
  agentAssigned: boolean;
  agentName: string;
  pickedUpDate: string;
}

export interface IRescheduleOrderArgs {
  id: string;
  body: {
    newDate: Date;
    newTimeSlot: string;
    rescheduleReason: string;
  };
}

/**
 * API Responses Models
 */
export interface IUnAssignedOrdersResponse {
  count: number;
  city: string;
  orders: IUnAssignedOrder[];
  message: string;
}

export interface IOrderStats {
  overall: {
    total: number;
    pending: number;
    completed: number;
    cancelled: number;
    unassigned: number;
    overdue: number;
  };
  today: {
    total: number;
    pending: number;
    completed: number;
    cancelled: number;
    unassigned: number;
  };
  tomorrow: {
    total: number;
    unassigned: number;
  };
  locationStats: ILocationStat[]; // <-- Add this
}

export interface IOrdersCount {
  today: {
    pending: number;
    completed: number;
    cancelled: number;
  };
  total: {
    pending: number;
    completed: number;
    cancelled: number;
  };
}

export interface IOrdersResponse {
  orders: IOrder[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalOrders: number;
    ordersPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  filters: {
    status: string;
    dateFilter: string;
    sortBy: string;
    order: string;
  };
}

// Define the new location stat type
export interface ILocationStat {
  location: string;
  totalPending: number;
  todayPending: number;
}

export interface IGetOrdersByStatusParams {
  status:
    | "pending"
    | "completed"
    | "cancelled"
    | "in-progress"
    | "unassigned"
    | "overdue"
    | "all";
  dateFilter?: "today" | "tomorrow";
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
  location?: string;
  search: string;
}

export interface IApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
