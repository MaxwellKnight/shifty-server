import { weekDays } from './weekDays'
import { shiftType } from './shiftType'
import { Secret } from 'jsonwebtoken'
const JWT: Secret = process.env.JWT || '123456'

export default { weekDays, shiftType, JWT }