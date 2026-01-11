import DockLayout from 'rc-dock'
import { DashboardLayoutConfig } from './DashboardLayoutConfig'

export default function DashboardPage() {
  return (
    <DockLayout
      defaultLayout={DashboardLayoutConfig}
      style={{
        width: '100%',
        height: '100%',
        background: 'hsl(var(--background))',
        color: 'hsl(var(--foreground))',
      }}
    />
  )
}
