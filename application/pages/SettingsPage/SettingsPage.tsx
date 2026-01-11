import DockLayout from 'rc-dock'
import { SettingsLayoutConfig } from './SettingsLayoutConfig'

export default function SettingsPage() {
  return (
    <DockLayout
      defaultLayout={SettingsLayoutConfig}
      style={{
        width: '100%',
        height: '100%',
        background: 'hsl(var(--background))',
        color: 'hsl(var(--foreground))',
      }}
    />
  )
}
