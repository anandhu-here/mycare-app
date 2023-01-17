import { GET_CURRENT_DATE, PREV_MONTH, SET_DAYS } from "../types/calendar";



const initialState = {
    days:[],
    currentMonth:null,
    currentDayOfMonth:null,
    currentYear:null,
    shiftsPublished: []
}
export const calendar = (state=initialState, action) =>{
    switch (action.type) {
        case "SHIFT_PUBLISHED":
            return{
                ...state,
                shiftsPublished:action.payload
            }
            break;
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