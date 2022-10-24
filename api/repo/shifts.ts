import { IBaseShift } from "../../interfaces/IShift"
import { Shift, PrevShift } from "../../models/Shift"

const getAllShifts = async () => {
    try {
        const shifts: IBaseShift[] = await Shift.find()
        if (shifts) { return { data: shifts } }
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
        if (shifts) return { data: shifts }
        else return { error: 'could not complete process' }
    } catch (error) {
        console.log(error)
        return { error }
    }
}

const saveSignlePrevShift = async (shift: any) => {
    try {
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
            isFoodSupplied: shift.isFoodSupplied,
            isTeamLeader: shift.isTeamLeader,
            isStudentPreferred: shift.isStudentPreferred,
            isWeekendActive: shift.isWeekendActive,
        }
        const createdShift = await PrevShift.create(newShift)
        if (createdShift) return createdShift
    } catch (error) {
        console.log(error)
        return
    }
}

const saveAllShifts = async (shifts: any) => {
    try {
        await Promise.all(shifts?.forEach(async (shift: any) => {
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
                isFoodSupplied: shift.isFoodSupplied,
                isTeamLeader: shift.isTeamLeader,
                isStudentPreferred: shift.isStudentPreferred,
                isWeekendActive: shift.isWeekendActive,
            }
            await PrevShift.create(newShift)
        }))
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

const updateShift = async (id: string, shift: any) => {
    try {
        const newAgent = await Shift.findByIdAndUpdate(id, { $set: { ...shift } }, { new: true })
        return { data: newAgent }
    } catch (err) {
        console.log(err)
        return { error: err }
    }
}

const deleteShiftById = async (id: string) => {
    try {
        await Shift.findByIdAndDelete(id)
    } catch (e: any) {
        console.log(e)
    }
}

const createShiftRepo = async (shift: any) => {
    try {
        const newShift: any = await Shift.create(shift)
        if (newShift) return newShift
        else return { error: 'could not create shift' }
    } catch (err) {
        return err
    }
}


export { getAllShifts, getSingleShift, saveAllShifts, getPrevShifts, deleteShiftById, updateShift, createShiftRepo, saveSignlePrevShift }