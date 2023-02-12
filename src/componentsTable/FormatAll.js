import {Row, Card,  Button, Col, FormControl, FormLabel} from 'react-bootstrap'
//import {useState} from 'react'
import { FormatOne } from './FormatOne'

export const FormatAll = ({photo, setPhoto, thema, price, setPrice}) =>{

    const PriceList = (format) =>{
        switch(format){
            case '10x15': return 0.6
            case '10x10': return 0.65
            case 'polar': return 0.65
            case 'miniPol': return 0.4
            case '15x20': return 1.2
            case '20x30': return 2.4
            case '30x40': return 32
            case '40x40': return 37
            case '40x55': return 43
            case '55x55': return 48
            case '55x80': return 60
            case '50x70': return 54
            case '5x8': return 3
            default: return 0
        }
    }

    const Sum = () =>{
        const pr = photo.reduce((sum, el)=>{
            return sum+PriceList(el.format)*el.amount
        },0 )

        return pr.toFixed(2)
    }

    const AddFormat = () =>{
        const data = {
            type: "photo",
            format: "10x15",
            amount: "1",
            paper: 'glossy'
        }
        setPhoto([...photo, data])
    }

    const DeleteFormat = (index) =>{
        setPhoto([...photo.slice(0, index), ...photo.slice(index + 1)])
    }

    return(
        <Card className='mt-3'>
            <Row className='p-3'>
                {photo.map((el, index)=>
                    <FormatOne key={index} index={index} el={el} thema={thema} DeleteFormat={DeleteFormat} photo={photo} setPhoto={setPhoto} />
                    )
                }
                </Row>
                <Row>
                    <Col md={3}>
                    <Button className='m-3 mt-0' variant ='light' style={{width:"100%"}} onClick={()=>AddFormat()}>+</Button>
                    </Col>
                    <Col className='mt-1 p-1' md={{span: 1, offset: 2}}>
                        <FormLabel>Рассчет:</FormLabel>
                    </Col>
                    <Col md={1}>
                        <Button variant ='light' onClick={()=>setPrice(Sum())}>{Sum()}</Button>
                    </Col>
                    <Col className='mt-1' md={{span: 1, offset: 1}}>
                        <FormLabel>Цена:</FormLabel>
                    </Col>
                    <Col md={2}>
                        <FormControl value={price} onChange={(e)=>setPrice(e.target.value)} />
                    </Col>
                    
                </Row>
                
            </Card>
    )
}