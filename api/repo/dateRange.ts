import { IDateRange } from "../../interfaces/IDateRange"
import { DateRange } from "../../models/Date"


const createDateRange = async (dateRange: IDateRange) => {
    try {
        const newDate: IDateRange = await DateRange.create(dateRange)
        if (newDate) return newDate
    } catch (error) {
        console.log(error)
        return
    }
}

export { createDateRange }