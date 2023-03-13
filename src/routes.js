import Print from "./pages/Print"
import Setting from "./pages/Setting"
import Statistic from "./pages/Statistic"
import Table from "./pages/Table"
import UsersDB from "./pages/UsersDB"
import Web from "./pages/Web"

export const routes = [
    {
        path: '/table',
        Component: Table
    },
    {
        path: '/web',
        Component: Web
    },
    {
        path: '/print',
        Component: Print
    },
    {
        path: '/usersDB',
        Component: UsersDB
    },
    {
        path: '/statistic',
        Component: Statistic
    },
    {
        path: '/setting',
        Component: Setting
    }
]