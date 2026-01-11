
import DockLayout from 'rc-dock'
import { DesignerLayoutConfig } from './DesignerLayoutConfig'

export default function DesignerPage() {
    return (
      <DockLayout
        defaultLayout={DesignerLayoutConfig}
        style={{
          width: '100%',
          height: '100%',
          background: 'hsl(var(--background))',
          color: 'hsl(var(--foreground))',
        }}
      />
    )
}
