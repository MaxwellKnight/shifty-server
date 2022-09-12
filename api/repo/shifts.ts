import { IBaseShift } from "../../interfaces/IShift"
import { Shift } from "../../models/Shift"

const getShifts = async () => {
    try {
        const shifts: IBaseShift[] = await Shift.find()
        return shifts
    } catch (err) {
        console.log(err)
    }
}

const getSingleShift = async (id: string): Promise<IBaseShift | Error> => {
    try {
        const shift: IBaseShift | null = await Shift.findById(id)
        if (shift) return shift
        else return new Error('Could find shift')
    } catch (err) {
        console.log(err)
        return new Error('Error trying to fetch shift')
    }
}

export { getShifts, getSingleShift }