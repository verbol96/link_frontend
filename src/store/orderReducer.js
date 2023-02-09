const defaultState = {
    editRow: 0
}

export const orderReducer = (state = defaultState, action) =>{
    switch(action.type){
        case 'editRow': return {...state, editRow: action.payload}
        
        default: return state
    }
}