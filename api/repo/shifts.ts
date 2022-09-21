import e from "express"
import { shiftType } from "../../constants/shiftType"
import { IBaseShift } from "../../interfaces/IShift"
import { Shift, PrevShift } from "../../models/Shift"

const getAllShifts = async () => {
    try {
        const shifts: IBaseShift[] = await Shift.find()
        return shifts
    } catch (err) {
        console.log(err)
    }
}
const getPrevShifts = async () => {
    try {
        const shifts: any = await PrevShift.find()
            .populate('agents')
        console.log(shifts.agents)
        if (shifts) return shifts
        else return []
    } catch (err) {
        console.log(err)
    }
}

const saveAllShifts = async (shifts: any) => {
    try {
        shifts?.forEach(async (shift: any) => {
            const newShift = {
                facility: shift.facility,
                type: shift.type,
                limit: shift.limit,
                agents: shift.agents,
                date: shift.date,
                length: shift.length,
                isFull: shift.isFull,
                timeLoss: shift.timeLoss,
                isFoodSupplied: shift.isFoodSupplied
            }
            await PrevShift.create(newShift)
        })
        return true
    } catch (err) {
        console.log(err)
    }
}

const getSingleShift = async (id: string) => {
    try {
        const shift = await PrevShift.findOne({ _id: id })
        if (shift) return shift
        else return new Error('Could find shift')
    } catch (err) {
        console.log(err)
        return new Error('Error trying to fetch shift')
    }
}

export { getAllShifts, getSingleShift, saveAllShifts, getPrevShifts }