import {Row, Col, Card, FormSelect, InputGroup, Button, FormControl} from 'react-bootstrap'

export const FormatPhoto = ({photo, setPhoto, thema}) =>{

    const AddFormat = () =>{
        setPhoto([...photo, 1])
    }

    const DeleteFormat = (index) =>{
        setPhoto([...photo.slice(0, index), ...photo.slice(index + 1)])
    }

    return(
        <Card className='mt-3'>
            <Row className='p-3'>
                {photo.map((el, index)=>
                    <Col key={index} md={4} className="mb-3">
                        <InputGroup size='sm'>
                            <FormSelect style={{width:"40%"}}>
                                <option>фото</option>
                                <option>холст</option>
                                <option>магнит</option>
                            </FormSelect>
                            <FormSelect style={{width:"60%"}}>
                                <option>10х15</option>
                                <option>10х10</option>
                                <option>полароид</option>
                            </FormSelect>
                            
                        </InputGroup>
                        <InputGroup size='sm'>
                            <FormControl  style={{width:"40%"}} />
                            <FormSelect style={{width:"40%"}}>
                                <option>glossy</option>
                                <option>lustre</option>
                            </FormSelect>
                            <Button variant ={thema()} style={{width:"20%"}} onClick={()=>DeleteFormat(index)}>X</Button>
                        </InputGroup>
                    </Col>
                    )
                }
                </Row>
                <Button className='m-3 mt-0' variant ='light' style={{width:"30%"}} onClick={()=>AddFormat()}>+</Button>
            </Card>
    )
}