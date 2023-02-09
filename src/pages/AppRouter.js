import {Routes, Route, Navigate} from 'react-router-dom'
import { routes } from '../routes'

const AppRouter = () =>{
    return(
        <Routes>
            {routes.map(({path, Component})=>{
                 return <Route key={path} path={path} element={<Component />} exact/>}
            )}
            <Route path='*' element={<Navigate to='/table'/>} />
        </Routes>
    )
}

export default AppRouter