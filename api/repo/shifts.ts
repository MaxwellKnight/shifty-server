import { IBaseShift } from "../../interfaces/IShift"
import { Shift, PrevShift } from "../../models/Shift"

const getAllShifts = async () => {
    try {
        const shifts: IBaseShift[] = await Shift.find()
        if (shifts) return { data: shifts }
        else return { error: 'could not find shift' }
    } catch (err) {
        console.log(err)
        return err
    }
}
const getPrevShifts = async () => {
    try {
        const shifts: any = await PrevShift.find()
            .populate('agents')
        console.log(shifts.agents)
        if (shifts) return { data: shifts }
        else return { error: 'could not complete process' }
    } catch (error) {
        console.log(error)
        return { error }
    }
}

const saveAllShifts = async (shifts: any) => {
    try {
        shifts?.forEach(async (shift: any) => {
            const newShift = {
                title: shift.title,
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
        return { data: true }
    } catch (error) {
        console.log(error)
        return { error }
    }
}

const getSingleShift = async (id: string) => {
    try {
        const shift = await PrevShift.findOne({ _id: id })
        if (shift) return { data: shift }
        else return { error: 'could not find shift' }
    } catch (error) {
        console.log(error)
        return { error }
    }
}

export { getAllShifts, getSingleShift, saveAllShifts, getPrevShifts }