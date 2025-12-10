import { ORDER_STATUS, TOperation, TAvailableRole } from "@utils/constants";

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
// export interface IOrder {
//   id: string;
//   orderId: string;
//   customer: ICustomerDetails;
//   product: IProductDetails;
//   device: IDeviceInfo;
//   status: ORDER_STATUS;
//   isOverdue: boolean;
//   scheduledDate: string;
//   timeSlot: string;
//   offerPrice: number;
//   finalPrice: number;
//   paymentMode: string;
//   assignment: IAssignmentDetails;
//   reschedule: IRescheduleDetails;
//   cancellation: ICancellationDetails | null;
//   createdAt: string;
//   completedAt: string | null;
// }

export interface IOrder {
  id: string;
  orderId: string;

  productDetails: {
    productCategory: string;
    productBrand: string;
    productName: string;
    variant: {
      variantName: string;
      price: number;
    };
  };
  deviceInfo: IDeviceInfo;

  customerDetails: {
    name: string;
    phone: number;
    email: string;
    addressDetails: IAddress;
  };

  finalDeductionSet: IFinalDeductionSet[];

  customerIDProof: {
    front: string;
    back: string;
    optional1: string;
    optional2: string;
  };

  schedulePickUp: {
    date: Date;
    timeSlot: string;
  };

  schedulePickUpRaw?: string;
  completedAt: Date;

  status: ORDER_STATUS;

  assignmentStatus: IAssignmentStatus;
  rescheduleStatus: IRescheduleStatus;

  cancellationDetails: ICancellationDetails;

  paymentMode: string;
  offerPrice: number;
  finalPrice: number;

  createdAt: string;
  updatedAt: string;
}

export interface IDeviceInfo {
  serialNumber?: string;
  imeiNumber?: string;
}

export interface IAddress {
  address: string;
  state: string;
  city: string;
  pinCode: string;
}

export interface IFinalDeductionSet {
  type: string;
  conditions: IFDSetCondition[];
}

export interface IAssignmentStatus {
  assigned: boolean;
  assignedAt: string;

  assignedTo: {
    name: string;
    phone: string;
    id: string;
    role: TAvailableRole;
  };
  assignedBy: {
    name: string;
    role: "admin" | "partner";
  };
}

export interface IRescheduleStatus {
  rescheduled: boolean;
  rescheduledBy: string;
  rescheduleReason: string;
  rescheduleCount: number;
  lastRescheduledDate: Date;
  previousScheduledDates: Array<Date>;
}

export interface ICancellationDetails {
  cancelledBy: string;
  cancelReason: string;
  cancelledAt: string;
}

// Unknown yet

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

export interface IPartnerOrderStats {
  success: boolean;
  data: {
    myWork: {
      active: number;
      completed: number;
      cancelled: number;
    };
    available: {
      total: IOrder[];
    };
    today: {
      myActive: number;
      myCompleted: number;
      available: IOrder[];
    };
    tomorrow: {
      myAssigned: number;
      available: IOrder[];
    };
  };
}

export type TFilterTab = "all" | "today" | "tomorrow";
