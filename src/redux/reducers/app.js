const initialState = {
    mainHeaderShown:true
}

export const app = (state=initialState, action) =>{
    switch (action.type) {
        case "SHOW_MAIN_HEADER":
            return{
                ...state,
                mainHeaderShown:true
            }
            break;
        case "HIDE_MAIN_HEADER":
            console.log("andiiiii")
            return{
                ...state,
                mainHeaderShown:false
            }
            break;
    
        default:
            return{
                ...state
            }
            break;
    }
}