const defaultState = {
    editRow: 0,
    order: [],
    user: [],
    photo: [],
    printList: []
}

export const orderReducer = (state = defaultState, action) =>{
    switch(action.type){
        case 'editRow': return {...state, editRow: action.payload}
        case 'saveOrder': return {...state, order: action.payload}
        case 'saveUser': return {...state, user: action.payload}
        case 'savePhoto': return {...state, photo: action.payload}
        case 'getPrintList': return {...state, printList: [...state.printList, action.payload]}
        case 'setPrintList': return {...state, printList: state.printList.filter(el=>el!==action.payload)}
        default: return state
    }
}