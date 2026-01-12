
import DockLayout from 'rc-dock'
import { DesignerLayoutConfig } from './DesignerLayoutConfig'
import ProtectedRoute from '@blockForge-ui/components/ProtectedRoute/ProtectedRoute'

export default function DesignerPage() {
  
  const isConnected = false
  const isAuthorized = false

  return (
    <ProtectedRoute isConnected={isConnected} isAuthorized={isAuthorized}>
      <DockLayout
        defaultLayout={DesignerLayoutConfig}
        style={{
          width: '100%',
          height: '100%',
          background: 'hsl(var(--background))',
          color: 'hsl(var(--foreground))',
        }}
      />
    </ProtectedRoute>
  )
}
