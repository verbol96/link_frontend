import './table.css'
import {Button, Col,Row, FormSelect, FormControl, Toast, FormCheck, FormLabel} from 'react-bootstrap'
import {useState} from 'react'

export const TableMenu = ({setIsFormAdd, setSelectPost, selectPost, inputSearch, setInputSearch, filterCheck, setFilterCheck}) =>{

    const [show, setShow] = useState(false);

    const Check = (e, id) =>{
        if(e){
            setFilterCheck(filterCheck.concat(id))
        }else{
            setFilterCheck(
                filterCheck.filter(el=>!id.includes(el))
            )
        }

    }

    return(
        <div className="TableMenu">
            <Row>
                <Col md={{span: 1, offset:1}}>
                    <Button size='sm' variant='dark' className='mt-2' style={{width: "100%"}} onClick={()=>{setIsFormAdd(true)}}>
                        <i className="bi bi-folder-plus"></i>
                    </Button>
                </Col>
                <Col md={2}>
                    <FormSelect size='sm' className='mt-2' value={selectPost} onChange={(e)=>setSelectPost(e.target.value)} >
                        <option value={'All'}>Европочта и Белпочта</option>
                        <option value={"E"}>только Европочта</option>
                        <option value={"R"}>только Белпочта</option>
                    </FormSelect>
                </Col>
                <Col md={2}>
                    <FormControl size='sm' value={inputSearch} placeholder='поиск...' className='mt-2' onChange={(e)=>setInputSearch(e.target.value)} />
                </Col>
                <Col md={{span: 1, offset:3}}>
                    <Button size='sm' variant='dark' className='mt-2' style={{width: "100%"}}>
                        <i className="bi bi-printer"></i>
                    </Button>
                </Col>
                <Col md={{span: 1}}>
                    <Button size='sm' variant='dark' className='mt-2' style={{width: "100%"}} onClick={()=>setShow(!show)} >
                        <i className="bi bi-filter-square"></i>
                    </Button>
                    <Toast delay={10000} autohide animation={false} bg={'Light'.toLowerCase()} className='p-2' style={{position:"absolute", right:`${100/12}%`, top:43, width: 250}} onClose={() => setShow(false)} show={show}>
                        <Row>
                            <Col md={{span: 2, offset:2}}><FormCheck defaultChecked={true} onChange={(e)=>Check(e.target.checked, [1,2,3,4])} type="switch" /></Col>
                            <Col><FormLabel>в работе</FormLabel></Col>
                        </Row>
                        <Row>
                            <Col md={{span: 2, offset:2}}><FormCheck onChange={(e)=>Check(e.target.checked, [5])} type="switch" /></Col>
                            <Col><FormLabel>отправленные</FormLabel></Col>
                        </Row>
                        <Row>
                            <Col md={{span: 2, offset:2}}><FormCheck onChange={(e)=>Check(e.target.checked, [6])} type="switch" /></Col>
                            <Col><FormLabel>оплаченные</FormLabel></Col>
                        </Row>
                    </Toast>
                </Col>
            </Row>
        </div>
    )
}