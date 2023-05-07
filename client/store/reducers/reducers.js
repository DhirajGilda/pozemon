import * as actionTypes from "../types";
import { v1 as uuidv1 } from 'uuid';

const initialState = {
    user:{isLoggedIn:false},
    sessionTime : 25,
    currentTime:1500,
    breakTime : 5,
    theme:'rain',
    tasks:[],
    mode: false,
}
const reducer =  (state = initialState , action)=>{
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.value
            }
        case actionTypes.SET_SESSION_TIME:
            return {
                ...state,
                sessionTime: action.value
            }
        case actionTypes.SET_CURRENT_TIME:
            return {
                ...state,
                currentTime: action.value
            }
        case actionTypes.SET_BREAK_TIME:
            return {
                ...state,
                breakTime: action.value
            }
        case actionTypes.SET_THEME:
            return {
                ...state,
                theme: action.value
            }
        case actionTypes.SET_TASK:
            const id = uuidv1();
            const newTask = {id: id, content: action.value , status:false}
            return {
                ...state,
                tasks: state.tasks.concat(newTask)
            }
        case actionTypes.SET_STATUS:
            var array = [...state.tasks];
            var taskIndex = array.findIndex(obj => obj.id === action.value);
            array[taskIndex].status = !array[taskIndex].status;
            return {
                ...state,
                tasks: array
            }
        case actionTypes.DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter((task)=> task.id !== action.value)
            }        
        case actionTypes.SET_MODE:
            return {
                ...state,
                mode: !state.mode
            }      
        case actionTypes.REHYDRATE:
            const rehydrated = (action && action.value) || {}
            return { ...state, ...rehydrated }        
    }
    return state;
}

export default reducer;