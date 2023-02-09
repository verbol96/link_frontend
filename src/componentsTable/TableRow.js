import {useDispatch} from 'react-redux'

export const TableRow = ({el, user, setIsFormAdd}) =>{

    const userOne = user.filter(step=>step.id === el.userId)
    const dispach = useDispatch()

    const EditRow = () =>{
        setIsFormAdd(true)
        dispach({type: "editRow", payload: el})
    }

    return(
        <tr onClick={()=>EditRow()}>
            <td>{el.id}</td>
            <td>{userOne[0].name}</td>
            <td>{userOne[0].phone}</td>
            <td>{userOne[0].city}</td>
        </tr>
    )
}