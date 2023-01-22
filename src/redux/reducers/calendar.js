import { GET_CURRENT_DATE, PREV_MONTH, SET_DAYS } from "../types/calendar";



const initialState = {
    days:[],
    currentMonth:null,
    currentDayOfMonth:null,
    currentYear:null,
    shiftsPublished: [],
    shiftsForAssign:null,
    can_shift : null
}
export const calendar = (state=initialState, action) =>{
    switch (action.type) {
        case "SHIFT_PUBLISHED":
            return{
                ...state,
                shiftsPublished:action.payload
            }
            break;
        case "CANCELLED_SHIFT":
            return{
                ...state,
                can_shift:action.payload
            }
        case "UNSET_SHIFT_FOR_ASSIGN":
            return{
                ...state,
                shiftsForAssign:null
            }
        case "SET_SHIFT_FOR_ASSIGN":
            return{
                ...state,
                shiftsForAssign:action.payload
            }
        case GET_CURRENT_DATE:

        return {
            ...state,
            currentDayOfMonth: action.payload.date,
            currentMonth: action.payload.month,
            currentYear: action.payload.year
        };
        case SET_DAYS:
            return {
                ...state,
                days: action.payload
            };
        case PREV_MONTH:
            return {
                ...state,
                currentMonth: action.payload.month,
                currentYear: action.payload.year
        };
        default:
            return{
                ...state
            }
            break;
    }
}