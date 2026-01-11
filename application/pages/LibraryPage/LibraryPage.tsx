import DockLayout from 'rc-dock'
import { LibraryLayoutConfig } from './LibraryLayoutConfig'

export default function LibraryPage() {
  return (
    <DockLayout
      defaultLayout={LibraryLayoutConfig}
      style={{
        width: '100%',
        height: '100%',
        background: 'hsl(var(--background))',
        color: 'hsl(var(--foreground))',
      }}
    />
  )
}
