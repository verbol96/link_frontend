import {useDispatch} from 'react-redux'
import {FormCheck, FormSelect} from 'react-bootstrap'
import axios from 'axios'
//import {useState} from 'react'
import _ from 'lodash'

export const TableRow = ({el, user, setIsFormAdd, photo}) =>{

    const dispach = useDispatch()          

    const EditRow = () =>{
        setIsFormAdd(true)
        dispach({type: "editRow", payload: el})
    }

    const date = el.createdAt.split("T")[0].split("-")

    const ColorBG = [
        'DarkSeaGreen',
        'Teal',
        'PaleTurquoise',
        'LemonChiffon',
        'LightBlue',
        'Plum',
        'OldLace'
    ]

    const ChangeStatus = (event) =>{
        axios.put(`http://94.228.126.26:8001/api/order/updateStatus/${el.id}`, {'status': event.target.value}).then(()=>{
            axios.get('http://94.228.126.26:8001/api/order/getAll').then(
            res=> {
                dispach({type: "saveOrder", payload: _.orderBy(res.data.order,'status', 'asc' )})
            }
        )})
    }

    const PhotoShow=()=>{

        return photo.reduce((sum, el)=>{
            if(el.paper==='lustre'){
                return sum+el.amount+"шт("+el.format+")ЛЮСТРА "
            }else{
                return sum+el.amount+"шт("+el.format+") "
            }
        }, '')
    }
    
    return(
        <tr>
            <td style={{width: 25}}><FormCheck /></td>
            <td style={{width: 55}} onClick={()=>EditRow()}>{date[2]+"."+date[1]}</td>
            <td style={{width: 35}} onClick={()=>EditRow()}>{user.typePost + el.id}</td>
            <td onClick={()=>EditRow()}>{user.nikname}</td>
            <td onClick={()=>EditRow()}>{user.phone}</td>
            <td onClick={()=>EditRow()}>{user.city}</td>
            <td onClick={()=>EditRow()} style={{fontSize:13}}>{PhotoShow()}</td>
            <td onClick={()=>EditRow()}>warn</td>
            <td style={{width: 100, textAlign:'right'}} onClick={()=>EditRow()}>{el.price}</td>
            <td>
                <FormSelect style={{backgroundColor: ColorBG[el.status]}} size='sm' value={el.status} onChange={(e)=>ChangeStatus(e)}>
                    <option value="1">в обработке</option>
                    <option value="2">принят</option>
                    <option value="3">готов к печати</option>
                    <option value="4">в печати</option>
                    <option value="5">упакован</option>
                    <option value="6">отправлен</option>
                    <option value="7">оплачен</option>
                </FormSelect>
            </td>
        </tr>
    )
}