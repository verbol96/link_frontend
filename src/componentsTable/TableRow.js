import {useDispatch} from 'react-redux'
import {FormCheck, FormSelect} from 'react-bootstrap'
import axios from 'axios'
//import React, { useState } from 'react';
import _ from 'lodash'

export const TableRow = ({el, user, setIsFormAdd, photo}) =>{

    const dispach = useDispatch()          

    const EditRow = () =>{
        setIsFormAdd(true)
        dispach({type: "editRow", payload: el})
    }

    const date = el.createdAt.split("T")[0].split("-")

    const ColorBG = [
        'white',// принят
        'Orchid',//готово к печати
        'Gold',// в печати
        'YellowGreen',// готово к отправке
        'LightSalmon',// отправлено
        'white'// оплачено
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

    const Warning = () =>{
        let a = []
        if(el.codeOutside){
            a.push(<i className="bi bi-qr-code" style={{}}></i>)
         }
        if(user.firstClass === true){
           a.push( <i className="bi bi-1-square-fill pr-1" style={{color:'red'}}></i>)
        }
        if(el.other){
            a.push( <i className="bi bi-exclamation-square" style={{backgroundColor :'yellow'}}></i>)
         }
         
        return a.map((el, index)=><span key={index}>{el} </span>)
    }

    const CheckChange =(e)=>{
        if(e){
            dispach({type:'getPrintList', payload: user})
        }else{
            dispach({type:'setPrintList', payload: user})
        }
    }
    
    return(
        <tr style={{fontSize:13}}>
            <td style={{width: 25}}><FormCheck onChange={(e)=>CheckChange(e.target.checked)} /></td>
            <td style={{width: 45, textAlign:'center', fontFamily: "Geneva", fontSize:12}} onClick={()=>EditRow()}>{date[2]+"."+date[1]}</td>
            <td style={{width: 35, textAlign:'center', color: 'DarkSlateGrey', fontSize:12, fontFamily: "Arial Black"}} onClick={()=>EditRow()}>{user.typePost + el.id}</td>
            <td style={{width: 180, overflow:'hidden', whiteSpace: 'nowrap'}} onClick={()=>EditRow()}>{user.nikname}</td>
            <td style={{width: 140, textAlign:'center', fontFamily: "Geneva", fontSize:11}} onClick={()=>EditRow()}>{user.phone}</td>
            <td style={{width: 140, textAlign:'center'}} onClick={()=>EditRow()}>{user.city}</td>
            <td onClick={()=>EditRow()} style={{fontSize:11}}>{PhotoShow()}</td>
            <td style={{width:56}} onClick={()=>EditRow()}>{Warning()}</td>
            <td style={{width: 110, textAlign:'right', fontFamily: "Geneva", fontSize:11}} onClick={()=>EditRow()}>{el.price}</td>
            <td style={{width: 110}}>
                <FormSelect style={{backgroundColor: ColorBG[el.status-1],  fontSize: 10, margin: -3, marginRight: 0}} size='sm' value={el.status} onChange={(e)=>ChangeStatus(e)}>
                    <option value="1">принят</option>
                    <option value="2">обработан</option>
                    <option value="3">в печати</option>
                    <option value="4">упакован</option>
                    <option value="5">отправлен</option>
                    <option value="6">оплачен</option>
                </FormSelect>
            </td>
        </tr>
    )
}