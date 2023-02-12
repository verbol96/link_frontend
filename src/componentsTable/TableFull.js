import {React, useEffect, useState} from 'react'
import {Table, Row, Col, FormCheck} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import { TableRow } from './TableRow'
import axios from 'axios'
import { FormAdd } from './FormAdd'
import { TableMenu } from './TableMenu'
import _ from 'lodash'

export const TableFull = () =>{

    const dispach = useDispatch()
    const [isFormAdd, setIsFormAdd] = useState(false)
    const [selectPost, setSelectPost] = useState("All")
    const [inputSearch, setInputSearch] = useState('')
    const [filterCheck, setFilterCheck] = useState([1,2,3,4,5])

    useEffect(()=>{
        axios.get('http://94.228.126.26:8001/api/order/getAll').then(
            res=> {
                dispach({type: "saveOrder", payload: _.orderBy(res.data.order,'status', 'asc' )})
                dispach({type: "saveUser", payload: _.orderBy(res.data.user,'id', 'asc' )})
            }
        )
    },[isFormAdd, dispach])

    const orderFull = useSelector(state=>state.order.order)
    const user = useSelector(state=>state.order.user)

    const OrderList = () =>{

        //фильтор по чекбоксу
        let order = orderFull.filter(s=>filterCheck.includes(s.status))
        //фильтор по поиску
        order = order.filter(el=>{
            const user1 = user.filter(step=>step.id=== el.userId)[0]
            const str = user1.city.toString()+user1.nikname.toString()+user1.phone.toString()
            return str.toLowerCase().includes(inputSearch.toLowerCase() )
        })
        //фильтор по типу почты
        switch(selectPost){
            case 'E': return order.filter(el=>{
                const user1 = user.filter(step=>step.id=== el.userId)[0]
                if(user1.typePost==="E"){
                    return true
                    } else return false
            })
            case 'R': return order.filter(el=>{
                const user1 = user.filter(step=>step.id=== el.userId)[0]
                if(user1.typePost==="R"){
                    return true
                    } else return false
            })
            default: {
                return order
            }
            
        }
        
    }
    
    const SumPrice = () =>{
        return OrderList().reduce((sum,el)=>{
            return sum+el.price
        },0)
    }

    return(
        <div>
        <TableMenu setIsFormAdd={setIsFormAdd} selectPost= {selectPost} setSelectPost={setSelectPost}
            inputSearch={inputSearch} setInputSearch={setInputSearch} filterCheck={filterCheck} setFilterCheck={setFilterCheck} />

        <Row className='justify-content-center' style={{backgroundColor: "rgb(232, 232, 232)", minHeight: 1000}}>
            <Col md={10} >
            <Table size='sm' className='mt-2' bordered hover  style={{backgroundColor:"white"}} >
                <thead style={{backgroundColor:"grayText"}}>
                <tr>
                    <td><FormCheck /></td>
                    <td>date</td>
                    <td>id</td>
                    <td>nikname</td>
                    <td>phone</td>
                    <td>city</td>
                    <td>photo</td>
                    <td>warn</td>
                    <td>price</td>
                    <td>status</td>
                </tr>
                </thead>
                <tfoot style={{backgroundColor:"grayText"}}>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>количество:</td>
                    <td></td>
                    <td style={{fontSize: 12}}>сумма: {SumPrice()}</td>
                    <td></td>
                </tr>
                </tfoot>
                <tbody>
                    {OrderList().map((el,index)=><TableRow key={index} el={el} user={user.filter(step=>step.id === el.userId)[0]} 
                        setIsFormAdd={setIsFormAdd} />)}
                </tbody>
             </Table>
            </Col>
        </Row>
        {isFormAdd?<FormAdd isFormAdd={isFormAdd} setIsFormAdd={setIsFormAdd} user={user} />:null}

        </div>
    )
}