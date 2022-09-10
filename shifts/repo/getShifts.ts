import mongoose from "mongoose"
import { Shift } from '../../models/Shift'
import { IBaseShift } from '../../interfaces/IShift'

mongoose.connect('mongodb://localhost/shifty')

const getShifts = async () => {
    try {
        const shifts: IBaseShift[] = await Shift.find()
        return shifts
    } catch (err) {
        console.log(err)
    }
}

export { getShifts }