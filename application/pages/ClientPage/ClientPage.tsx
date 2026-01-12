import DockLayout from 'rc-dock'
import { ClientLayoutConfig } from './ClientLayoutConfig'

export default function ClientPage() {

  return (
      <DockLayout
        defaultLayout={ClientLayoutConfig}
        style={{
          width: '100%',
          height: '100%',
          background: 'hsl(var(--background))',
          color: 'hsl(var(--foreground))',
        }}
      />
  )
}
