import { PriorityStatus } from "../enums";

export type Ticket = {
  id: string;
  title: string;
  description: string;
  priority: PriorityStatus;
};
