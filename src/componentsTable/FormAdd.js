import {Modal, Button, Row, Col, ModalFooter, FormLabel, FormControl , Alert, FormSelect, Card, Form, FormCheck} from 'react-bootstrap'
import {useState} from 'react'
import './table.css'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {nanoid} from 'nanoid'
import { FormatAll } from './FormatAll'
import {CopyToClipboard} from 'react-copy-to-clipboard';


export const FormAdd = ({isFormAdd, setIsFormAdd, user, loading}) =>{

    const dispach = useDispatch()
    const editRow = useSelector(state=>state.order.editRow)
    const photoAll = useSelector(state=>state.order.photo)
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
    const [firstClass, setFirstClass] = useState(editRow.id>0 ? userOne[0].firstClass : false)
    
    const [other, setOther] =useState(editRow.id>0 ? editRow.other : '')
    const [codeInside] =useState(editRow.id>0 ? editRow.codeInside : nanoid(6))
    const [codeOutside, setCodeOutside] =useState(editRow.id>0 ? editRow.codeOutside : '')
    const [price, setPrice] =useState(editRow.id>0 ? editRow.price : 0)

    const [photo, setPhoto] = useState(editRow.id>0 ? photoAll.filter(el=>el.orderId===editRow.id) :[])
  
    const SendToDB = () =>{
        const data = {
            "name": name,
            "nikname": nikname,
            "phone": phone,
            "typePost": typePost,
            "city": city,
            "adress": adress,
            "oblast": oblast,
            "raion": raion,
            "postCode": postCode,
            "photo": photo, 
            "userId": userId,
            "other":other,
            "codeInside": codeInside,
            "codeOutside": codeOutside,
            "price": price,
            "firstClass": firstClass
        }

        editRow.id>0 ?
        axios.put(`http://94.228.126.26:8001/api/order/updateOrder/${editRow.id}`, data).then(()=>{
            axios.get('http://94.228.126.26:8001/api/order/getAll').then(
            res=> { loading(res)}
        )})
        : 
        axios.post('http://94.228.126.26:8001/api/order/addOrder', data).then(()=>{
            axios.get('http://94.228.126.26:8001/api/order/getAll').then(
                res=> { loading(res)}
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
                res=> { loading(res)}
        )})
        setIsFormAdd(false)
        dispach({type:"editRow", payload: 0})
    }

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
                        <CopyToClipboard text={phone+ " "+name}>
                        <Button  className='mt-2 button-copy' style={{width:"100%"}} variant='light' size='sm'>copy</Button>
                        </CopyToClipboard>
                        </Col>
                    </Row>
                    
                </Col>

                <Col md={{span:6, offset:1}}>
                    <Row>
                        <Col md={5} className="mb-1">
                            <FormSelect  size='sm' defaultValue={typePost} onChange={(e)=>setTypePost(e.target.value)}>
                                <option value={'E'}>Европочта</option>
                                <option value={'R'}>Белпочта</option>
                            </FormSelect>
                        </Col>
                        {typePost==="R"?<>
                        <Col md={{span:1, offset:2}} className="mb-1">
                            <FormCheck checked={firstClass} onChange={(e)=>setFirstClass(e.target.checked)} />
                        </Col>
                        <Col md={{span:4, offset:0}} className="mb-1">
                            <FormLabel style={{fontSize:15}}>первый класс</FormLabel>
                        </Col></>:null}
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
                    <Row className="mb-1">
                        <Col md={3}> <FormLabel>Адрес:</FormLabel></Col>
                        <Col md={9}><FormControl size='sm' value={adress} onChange={(e)=>setAdress(e.target.value)} /> </Col>
                    </Row>
                    <Row className="mb-1">
                        <Col md={3}> <FormLabel>Индекс:</FormLabel></Col>
                        <Col md={9}><FormControl size='sm' value={postCode} onChange={(e)=>setPostCode(e.target.value)} /> </Col>
                    </Row>
                    <Row className="mb-1">
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

            <FormatAll photo={photo} setPhoto={setPhoto} thema={thema} price={price} setPrice={setPrice} />
            
            <Card className='mt-3'>
                <Row className='p-3'>
                    <Col md={6}>
                        <Form.Label size='sm'>Примечания:</Form.Label>
                        <FormControl value={other} onChange={(e)=>setOther(e.target.value)} size='sm' as="textarea" rows={3} />
                    </Col>
                    <Col md={3}>
                        <Form.Label size='sm'>Внутренний код:</Form.Label>
                        <FormControl defaultValue={codeInside} size='sm' disabled />
                        <Button onClick={()=>navigator.clipboard.writeText(codeInside)} className='mt-2' style={{width:"100%"}} variant='light' size='sm'>copy</Button>
                    </Col>
                    <Col md={3}>
                        <Form.Label size='sm'>Почтовый код:</Form.Label>
                        <FormControl size='sm'   value={codeOutside} onChange={(e)=>setCodeOutside(e.target.value)} />
                        <Button onClick={()=>navigator.clipboard.writeText(codeOutside)} className='mt-2' style={{width:"100%"}} size='sm' variant='light'>copy</Button>
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