import mongoose from "mongoose"

export interface IBaseShift {
    title: string,
    facility: string,
    type: string,
    limit: number
    agents: string[],
    date: Date,
    length: number,
    isFull: boolean,
    timeLoss?: number,
    isFoodSupplied?: boolean,
    createdAt?: Date,
    updatedAt?: Date
}

export interface IDailyConstraints {
    morning: boolean,
    noon: boolean,
    night: boolean,
    notes?: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
}