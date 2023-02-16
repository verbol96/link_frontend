import {Row, Col, Button} from 'react-bootstrap'
import { LeftMenu } from './LeftMenu'
import {useDispatch} from 'react-redux'

export const NavBar = () =>{
    const dispach = useDispatch()
    return (
        <div style={{ backgroundColor: 'DarkSlateGrey', minHeight: 50, width: '100%'}}>
            <LeftMenu />
            <Row>
                <Col md={1}>
                    <Button variant='dark' className='mt-2' style={{marginLeft: '5%', color: 'black', backgroundColor: 'DarkSlateGrey'}} size='sm' onClick={()=>dispach({type:'showLeftMenu'})}>
                        <i className="bi bi-list"></i>
                    </Button>
                </Col>
            </Row>  
        </div>
    )
}