import {React, useEffect, useState} from 'react'
import {Table, Row, Col} from 'react-bootstrap'
//import {useSelector} from 'react-redux'
import { TableRow } from './TableRow'
import axios from 'axios'
import { FormAdd } from './FormAdd'
import { TableMenu } from './TableMenu'

export const TableFull = () =>{

    const [order, setOrder] = useState([])
    const [user, setUser] = useState([])
    const [isFormAdd, setIsFormAdd] = useState(false)

    useEffect(()=>{
        axios.get('http://94.228.126.26:8001/api/order/getAll').then(
            res=> {
                setOrder(res.data.order)
                setUser(res.data.user)
            }
        )
    },[isFormAdd])
    return(
        <div>
        <TableMenu setIsFormAdd={setIsFormAdd} />

        <Row className='justify-content-center' style={{backgroundColor: "rgb(232, 232, 232)", minHeight: 1000}}>
            <Col md={10} >
            <Table size='sm' className='mt-2' bordered hover  style={{backgroundColor:"white"}} >
                <thead style={{backgroundColor:"grayText"}}>
                <tr>
                    <td>ID</td>
                    <td>name</td>
                    <td>phone</td>
                    <td>city</td>
                </tr>
                </thead>
                <tfoot style={{backgroundColor:"grayText"}}>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>сумма: 100р</td>
                </tr>
                </tfoot>
                <tbody>
                    {order.map((el,index)=><TableRow key={index} el={el} user={user} setIsFormAdd={setIsFormAdd} />)}
                </tbody>
             </Table>
            </Col>
        </Row>
        {isFormAdd?<FormAdd isFormAdd={isFormAdd} setIsFormAdd={setIsFormAdd} user={user} />:null}
        
        
        

        </div>
    )
}