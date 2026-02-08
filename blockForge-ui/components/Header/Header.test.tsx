import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { Header, type NavigationItem } from "./Header";

describe("Header - navigation essentielle", () => {
    const navigationItems: NavigationItem[] = [
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/designer', label: 'Designer' },
        { path: '/architect', label: 'Architect' },
        { path: '/client', label: 'Client' },
        { path: '/library', label: 'Library' },
        { path: '/settings', label: 'Settings' },
    ]

    it("affiche le titre et le header", () => {
        render(
            <BrowserRouter>
                <Header title="BlockForge" navigationItems={navigationItems} locationPathname="/settings" />
            </BrowserRouter>
        )
        expect(screen.getByText('BlockForge')).toBeInTheDocument()
        expect(screen.getByRole("heading", { name: 'BlockForge' })).toBeInTheDocument()
    })

    it("affiche tous les liens de navigation", () => {
        render(
            <BrowserRouter>
                <Header title="BlockForge" navigationItems={navigationItems} locationPathname="/settings" />
            </BrowserRouter>
        )
        navigationItems.forEach((item) => {
            expect(screen.getByRole("link", { name: item.label })).toBeInTheDocument()
        })
    })

    it("marque le lien actif (Settings) avec la classe active sur /settings", () => {
        render(
            <MemoryRouter initialEntries={['/settings']}>
                <Header title="BlockForge" navigationItems={navigationItems} locationPathname="/settings" />
            </MemoryRouter>
        )
        const settingsLink = screen.getByRole("link", { name: "Settings" })
        expect(settingsLink).toHaveClass("active")
    })

    it("marque les liens inactifs avec la classe disabled (ex: Settings sur /library)", () => {
        render(
            <MemoryRouter initialEntries={['/library']}>
                <Header title="BlockForge" navigationItems={navigationItems} locationPathname="/library" />
            </MemoryRouter>
        )
        const settingsLink = screen.getByRole("link", { name: "Settings" })
        expect(settingsLink).toHaveClass("disabled")
    })

    it("utilise le titre par défaut quand title n'est pas fourni", () => {
        render(
            <BrowserRouter>
                <Header locationPathname="/" />
            </BrowserRouter>
        )
        expect(screen.getByRole("heading", { name: "BlockForge" })).toBeInTheDocument()
    })

    it("n'affiche aucun lien quand navigationItems n'est pas fourni", () => {
        render(
            <MemoryRouter initialEntries={['/library']}>
                <Header title="BlockForge" locationPathname="/library" />
            </MemoryRouter>
        )
        expect(screen.getByRole("navigation")).toBeInTheDocument()
        expect(screen.queryByText("Designer")).not.toBeInTheDocument()
    })
})
