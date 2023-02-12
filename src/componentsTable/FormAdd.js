import {Modal, Button, Row, Col, ModalFooter, FormLabel, FormControl , Alert, FormSelect, Card, Form} from 'react-bootstrap'
import {useState} from 'react'
import './table.css'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import _ from 'lodash'
import {nanoid} from 'nanoid'
import { FormatPhoto } from './FormatPhoto'

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
    const [raion, setRaion] = useState(editRow.id>0 ? userOne[0].raion : '')
    const [postCode, setPostCode] = useState(editRow.id>0 ? userOne[0].postCode : '')
    
    const [other, setOther] =useState(editRow.id>0 ? editRow.other : '')
    const [codeInside] =useState(editRow.id>0 ? editRow.codeInside : nanoid(6))
    const [codeOutside, setCodeOutside] =useState(editRow.id>0 ? editRow.codeOutside : '')

    const SendToDB = () =>{
        const data = {
            "name": name,
            "nikname": nikname,
            "phone":phone,
            "typePost": typePost,
            "city": city,
            "adress": adress,
            "oblast": oblast,
            "raion": raion,
            "postCode": postCode,
            "photo": [], 
            "userId": userId,
            "other":other,
            "codeInside": codeInside,
            "codeOutside": codeOutside

        }
        
        editRow.id>0 ?
        axios.put(`http://94.228.126.26:8001/api/order/updateOrder/${editRow.id}`, data).then(()=>{
            axios.get('http://94.228.126.26:8001/api/order/getAll').then(
            res=> {
                dispach({type: "saveOrder", payload: _.orderBy(res.data.order,'status', 'asc' )})
                dispach({type: "saveUser", payload: res.data.user})
            }
        )})
        : 
        axios.post('http://94.228.126.26:8001/api/order/addOrder', data).then(()=>{
            axios.get('http://94.228.126.26:8001/api/order/getAll').then(
            res=> {
                dispach({type: "saveOrder", payload: _.orderBy(res.data.order,'status', 'asc' )})
                dispach({type: "saveUser", payload: res.data.user})
            }
        )})
        ModalClose()
    }

    const ModalClose = () =>{
        setIsFormAdd(false)
        dispach({type:"editRow", payload: 0})
    }

    const DeleteBtn = () =>{
        axios.delete(`http://94.228.126.26:8001/api/order/deleteOrder/${editRow.id}`).then(()=>{
            axios.get('http://94.228.126.26:8001/api/order/getAll').then(
            res=> {
                dispach({type: "saveOrder", payload: _.orderBy(res.data.order,'status', 'asc' )})
            }
        )})
        setIsFormAdd(false)
        dispach({type:"editRow", payload: 0})
    }

    const [photo, setPhoto] = useState([])



    const thema =()=>{
        if(editRow.id>0) return 'success'
        else return 'primary'
    }

    return(
        <Modal size='lg' show={isFormAdd} onHide={()=>ModalClose()} dialogClassName="modal-80w">
        <Modal.Body>
            {editRow.id>0?
            <Alert size="sm" variant ={thema()}>Редактирование заказа</Alert>:
            <Alert size="sm" variant ={thema()}>Добавление заказа</Alert>
            }
            
            <Card className='mt-3'>
            <Row className='p-3'>
                <Col md={5}>
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
                    <Row>
                        <Col md={{span: 9, offset:3}}> 
                        <Button className='mt-2' style={{width:"100%"}} variant='light' size='sm'>copy</Button>
                        </Col>
                    </Row>
                    
                </Col>

                
                
                <Col md={{span:6, offset:1}}>
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
                        <Col md={9}><FormControl size='sm' value={raion} onChange={(e)=>setRaion(e.target.value)} /> </Col>
                    </Row>
                    <Row>
                        <Col md={3}> <FormLabel>Область:</FormLabel></Col>
                        <Col md={9}><FormControl size='sm' value={oblast} onChange={(e)=>setOblast(e.target.value)} /> </Col>
                    </Row>
                    </>
                    }
                </Col>
            </Row>
            </Card>

            <FormatPhoto photo={photo} setPhoto={setPhoto} thema={thema} />
            
            <Card className='mt-3'>
                <Row className='p-3'>
                    <Col md={6}>
                        <Form.Label size='sm'>Примечания:</Form.Label>
                        <FormControl value={other} onChange={(e)=>setOther(e.target.value)} size='sm' as="textarea" rows={3} />
                    </Col>
                    <Col md={3}>
                        <Form.Label size='sm'>Внутренний код:</Form.Label>
                        <FormControl defaultValue={codeInside} size='sm' disabled />
                        <Button className='mt-2' style={{width:"100%"}} variant='light' size='sm'>copy</Button>
                    </Col>
                    <Col md={3}>
                        <Form.Label size='sm'>Почтовый код:</Form.Label>
                        <FormControl size='sm'   value={codeOutside} onChange={(e)=>setCodeOutside(e.target.value)} />
                        <Button className='mt-2' style={{width:"100%"}} size='sm' variant='light'>copy</Button>
                    </Col>
                </Row>
            </Card>

            
        </Modal.Body>
        <ModalFooter>
            <Row>
                <Col>
                    <Button variant ={thema()} onClick={()=>SendToDB()}>Сохранить</Button>{" "}
                    <Button variant="light" onClick={()=>ModalClose()}>Отмена</Button>{" "}
                    <Button variant="light" onClick={()=>DeleteBtn()}>Удалить</Button>
                </Col>
            </Row>
        </ModalFooter>
      </Modal>
                    
                
    )
}