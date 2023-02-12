const defaultState = {
    editRow: 0,
    order: [],
    user: []
}

export const orderReducer = (state = defaultState, action) =>{
    switch(action.type){
        case 'editRow': return {...state, editRow: action.payload}
        case 'saveOrder': return {...state, order: action.payload}
        case 'saveUser': return {...state, user: action.payload}
        default: return state
    }
}