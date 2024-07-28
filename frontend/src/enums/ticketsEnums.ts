export enum PriorityStatus {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
}

export const PriorityStatusLabels: { [key in PriorityStatus]: string } = {
  [PriorityStatus.LOW]: "Low",
  [PriorityStatus.MEDIUM]: "Medium",
  [PriorityStatus.HIGH]: "High",
};
