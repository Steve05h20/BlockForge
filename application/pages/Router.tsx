import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import DashboardPage from './DashboardPage/DashboardPage'
import DesignerPage from './DesignerPage/DesignerPage'
import ArchitectPage from './ArchitectPage/ArchitectPage'
import ClientPage from './ClientPage/ClientPage'
import LibraryPage from './LibraryPage/LibraryPage'
import SettingsPage from './SettingsPage/SettingsPage'


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <DashboardPage />,
            },
            {
                path: 'dashboard',
                element: <DashboardPage />,
            },
            {
                path: 'designer',
                element: <DesignerPage />,
            },
            {
                path: 'architect',
                element: <ArchitectPage />,
            },
            {
                path: 'client',
                element: <ClientPage />,
            },
            {
                path: 'library',
                element: <LibraryPage />,
            },
            {
                path: 'settings',
                element: <SettingsPage />,
            },
        ],
    },
])

export function AppRouter() {
    return <RouterProvider router={router} />
}
