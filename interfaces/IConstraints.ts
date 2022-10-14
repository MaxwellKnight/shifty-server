import { IDailyConstraints } from "./IShift";

export interface IConstraints {
    agentId: string,
    tableId: string,
    constraints: Map<Date, IDailyConstraints>
}