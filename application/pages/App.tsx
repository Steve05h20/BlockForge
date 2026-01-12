import 'rc-dock/dist/rc-dock.css'
import { Header, type NavigationItem } from '@blockForge-ui/components/Header/Header'
import { Outlet } from 'react-router-dom'

const navigationItems: NavigationItem[] = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/designer', label: 'Designer' },
  { path: '/architect', label: 'Architect' },
  { path: '/client', label: 'Client' },
  { path: '/library', label: 'Library' },
  { path: '/settings', label: 'Settings' },
]

function App() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <Header title="BlockForge" navigationItems={navigationItems} />
      <div className="flex-1 overflow-hidden w-full h-full">
        <Outlet />
      </div>
    </div>
  )
}

export default App
