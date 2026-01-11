import DockLayout from 'rc-dock'
import { ArchitectLayoutConfig } from './ArchitectLayoutConfig'

export default function ArchitectPage() {
  return (
    <DockLayout
      defaultLayout={ArchitectLayoutConfig}
      style={{
        width: '100%',
        height: '100%',
        background: 'hsl(var(--background))',
        color: 'hsl(var(--foreground))',
      }}
    />
  )
}
