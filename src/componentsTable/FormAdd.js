import {Modal, Button, Row, Col, ModalFooter, FormLabel, FormControl , Alert, FormSelect} from 'react-bootstrap'
import {useState} from 'react'
import './table.css'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import _ from 'lodash'

export const FormAdd = ({isFormAdd, setIsFormAdd, user}) =>{

    const dispach = useDispatch()
    const editRow = useSelector(state=>state.order.editRow)
    const userOne = user.filter(el=>el.id === editRow.userId)

    const [userId] = useState( editRow.id>0 ? userOne[0].id : '')
    const [name, setName] = useState( editRow.id>0 ? userOne[0].name : '')
    const [nikname, setNikname] = useState( editRow.id>0 ? userOne[0].nikname : '')
    const [phone, setPhone] = useState(editRow.id>0 ? userOne[0].phone : '')

    const [typePost, setTypePost] = useState(editRow.id>0 ? userOne[0].typePost : 'E')
    const [city, setCity] = useState(editRow.id>0 ? userOne[0].city : '')
    const [adress, setAdress] = useState(editRow.id>0 ? userOne[0].adress : '')

    const [oblast, setOblast] = useState(editRow.id>0 ? userOne[0].oblast : '')
    const [rayon, setRayon] = useState(editRow.id>0 ? userOne[0].rayon : '')
    const [postCode, setPostCode] = useState(editRow.id>0 ? userOne[0].postCode : '')
    

    const SendToDB = () =>{
        const data = {
            "name": name,
            "nikname": nikname,
            "phone":phone,
            "typePost": typePost,
            "city": city,
            "adress": adress,
            "oblast": oblast,
            "rayon": rayon,
            "postCode": postCode,
            "photo": [], 
            "userId": userId
        }
        
           /* "password": "1234",
            
            "firstClass": false,
           
            "codeInside": "code"
            "price": "10",
            "photo": []*/

        editRow.id>0 ?
        axios.put(`http://94.228.126.26:8001/api/order/updateOrder/${editRow.id}`, data).then(()=>{
            axios.get('http://94.228.126.26:8001/api/order/getAll').then(
            res=> {
                dispach({type: "saveOrder", payload: _.orderBy(res.data.order,'status', 'asc' )})
            }
        )})
        : 
        axios.post('http://94.228.126.26:8001/api/order/addOrder', data).then(()=>{
            axios.get('http://94.228.126.26:8001/api/order/getAll').then(
            res=> {
                dispach({type: "saveOrder", payload: _.orderBy(res.data.order,'status', 'asc' )})
            }
        )})

        setTimeout(() => {setIsFormAdd(false)}, 100);
        
    }

    const ModalClose = () =>{
        setTimeout(() => {setIsFormAdd(false)}, 100);
        dispach({type:"editRow", payload: 0})
    }

    const DeleteBtn = () =>{
        axios.delete(`http://94.228.126.26:8001/api/order/deleteOrder/${editRow.id}`)
        setTimeout(() => {setIsFormAdd(false)}, 100);
        dispach({type:"editRow", payload: 0})
    }

    return(
        <Modal size='lg' show={isFormAdd} onHide={()=>ModalClose()} dialogClassName="modal-80w">
        <Modal.Body>
            <Alert size="sm" variant='secondary'>Добавление заказа</Alert>
            <Row>
                <Col>
                    <Row className="mb-1">
                        <Col md={3}> <FormLabel>Имя:</FormLabel></Col>
                        <Col md={9}><FormControl size='sm' value={nikname} onChange={(e)=>setNikname(e.target.value)} /> </Col>
                    </Row>
                    <Row className="mb-1">
                        <Col md={3}> <FormLabel>ФИО</FormLabel></Col>
                        <Col md={9}><FormControl size='sm'  value={name} onChange={(e)=>setName(e.target.value)} /> </Col>
                    </Row>
                    <Row>
                        <Col md={3}> <FormLabel>Телефон:</FormLabel></Col>
                        <Col md={9}><FormControl size='sm' value={phone} onChange={(e)=>setPhone(e.target.value)} /> </Col>
                    </Row>
                </Col>

                
                
                <Col>
                    <Row>
                        <Col md={6} className="mb-1">
                            <FormSelect  size='sm' defaultValue={typePost} onChange={(e)=>setTypePost(e.target.value)}>
                                <option value={'E'}>Европочта</option>
                                <option value={'R'}>Белпочта</option>
                            </FormSelect>
                        </Col>
                    </Row>
                    {typePost==="E"?
                    <>
                    <Row className="mb-1">
                        <Col md={3}> <FormLabel>Город:</FormLabel></Col>
                        <Col md={9}><FormControl size='sm' value={city} onChange={(e)=>setCity(e.target.value)} /> </Col>
                    </Row>
                    <Row>
                        <Col md={3}> <FormLabel>Отделение:</FormLabel></Col>
                        <Col md={9}><FormControl size='sm' value={adress} onChange={(e)=>setAdress(e.target.value)} /> </Col>
                    </Row>
                    </>
                    :
                    <>
                    <Row className="mb-1">
                        <Col md={3}> <FormLabel>Город:</FormLabel></Col>
                        <Col md={9}><FormControl size='sm' value={city} onChange={(e)=>setCity(e.target.value)} /> </Col>
                    </Row>
                    <Row>
                        <Col md={3}> <FormLabel>Адрес:</FormLabel></Col>
                        <Col md={9}><FormControl size='sm' value={adress} onChange={(e)=>setAdress(e.target.value)} /> </Col>
                    </Row>
                    <Row className="mb-1">
                        <Col md={3}> <FormLabel>Индекс:</FormLabel></Col>
                        <Col md={9}><FormControl size='sm' value={postCode} onChange={(e)=>setPostCode(e.target.value)} /> </Col>
                    </Row>
                    <Row>
                        <Col md={3}> <FormLabel>Район:</FormLabel></Col>
                        <Col md={9}><FormControl size='sm' value={rayon} onChange={(e)=>setRayon(e.target.value)} /> </Col>
                    </Row>
                    <Row>
                        <Col md={3}> <FormLabel>Область:</FormLabel></Col>
                        <Col md={9}><FormControl size='sm' value={oblast} onChange={(e)=>setOblast(e.target.value)} /> </Col>
                    </Row>
                    </>
                    }
                </Col>
                
            </Row>



            
        </Modal.Body>
        <ModalFooter>
            <Row>
                <Col>
                    <Button variant="secondary" onClick={()=>SendToDB()}>Сохранить</Button>{" "}
                    <Button variant="light" onClick={()=>ModalClose()}>Отмена</Button>{" "}
                    <Button variant="danger" onClick={()=>DeleteBtn()}>Удалить</Button>
                </Col>
            </Row>
        </ModalFooter>
      </Modal>
                    
                
    )
}