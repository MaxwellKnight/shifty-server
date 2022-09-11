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

export { getShifts }