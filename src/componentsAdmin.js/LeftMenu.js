import React from 'react';
import {Offcanvas, Row, Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'

export const LeftMenu = ()=>{
  
  const navigate = useNavigate()
  const dispach = useDispatch()
  const leftMenu = useSelector(state=>state.order.leftMenu)

  const Close = (link) =>{
    dispach({type:'closeLeftMenu'})
    navigate(link)
  }

  return (
    <>
      <Offcanvas show={leftMenu} onHide={()=>dispach({type:"closeLeftMenu"})} style={{width: 300, backgroundColor:'rgb(232, 232, 232)'}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>АДМИН ПАНЕЛЬ</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Row className='mt-3'>
            <Button variant="dark" onClick={()=>Close('/table')}>
                Таблица
            </Button>
            </Row>
            <Row className='mt-3'>
            <Button variant="dark" onClick={()=>Close('/usersDB')}>
                управление пользователями
            </Button>
            </Row>
            <Row className='mt-3'>
            <Button variant="dark">
                статистика
            </Button>
            </Row>
            <Row className='mt-3'>
            <Button variant="dark" onClick={()=>Close('/web')}>
                сайт
            </Button>
            </Row>
            <Row className='mt-3'>
            <Button variant="dark">
                настройки
            </Button>
            </Row>
        
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
