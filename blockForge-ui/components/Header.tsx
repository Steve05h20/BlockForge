import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Switch } from '@blockForge-ui/ui/switch'
import { Typography } from '@blockForge-ui/ui/typography'
import { cn } from '@blockForge-ui/lib/utils'

export interface NavigationItem {
    path: string
    label: string
}

interface HeaderProps {
    title?: string
    navigationItems?: NavigationItem[]
}

export function Header({ title = 'BlockForge', navigationItems = [] }: HeaderProps) {
    const [theme, setTheme] = useState<'light' | 'dark'>('light')
    const location = useLocation()

    useEffect(() => {
        document.body.classList.toggle('dark', theme === 'dark')
    }, [theme])

    return (
        <header className="p-4 border-b flex items-center justify-between">
            <Typography variant="h3" className="text-2xl font-bold">
                {title}
            </Typography>
            <nav className="flex items-center gap-1 absolute left-1/2 transform -translate-x-1/2">
                {navigationItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/dashboard'}
                        className={({ isActive }) =>
                            cn(
                                'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                                isActive || (item.path === '/dashboard' && location.pathname === '/')
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                            )
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}
            </nav>
            <div className="flex items-center gap-4">
                <Switch
                    checked={theme === 'dark'}
                    onCheckedChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                />
            </div>
        </header>
    )
}
