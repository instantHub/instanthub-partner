export enum ORDER_STATUS {
  IN_PROGRESS = "in-progress",
  PENDING = "pending",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

// assignmentStatus
export enum ASSIGNMENT_STATUS {
  UNASSIGNED = "unassigned",
  PARTNER = "partner",
  PARTNER_EXECUTIVE = "partner_executive",
}

export type TOperation = "Add" | "Subtract";
