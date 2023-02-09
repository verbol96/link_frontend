import './table.css'
import {Button, Col,Row, FormSelect, FormControl} from 'react-bootstrap'

export const TableMenu = ({setIsFormAdd}) =>{
    return(
        <div className="TableMenu">
            <Row>
                <Col md={{span: 1, offset:1}}>
                    <Button size='sm' variant='secondary' className='mt-2' style={{width: "100%"}} onClick={()=>{setIsFormAdd(true)}}>+</Button>
                </Col>
                <Col md={2}>
                    <FormSelect size='sm' className='mt-2'>
                        <option>Европочта и Белпочта</option>
                        <option>только Европочта</option>
                        <option>только Белпочта</option>
                    </FormSelect>
                </Col>
                <Col md={2}>
                    <FormControl size='sm' placeholder='поиск...' className='mt-2' />
                </Col>
                <Col md={{span: 1, offset:3}}>
                    <Button size='sm' variant='secondary' className='mt-2' style={{width: "100%"}}>print</Button>
                </Col>
                <Col md={{span: 1}}>
                    <Button size='sm' variant='secondary' className='mt-2' style={{width: "100%"}}>filter</Button>
                </Col>
            </Row>
        </div>
    )
}