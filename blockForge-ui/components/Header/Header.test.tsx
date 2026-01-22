import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { Header, type NavigationItem } from "./Header";

describe("Header", () => {
    const navigationItems: NavigationItem[] = [
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/designer', label: 'Designer' },
        { path: '/architect', label: 'Architect' },
        { path: '/client', label: 'Client' },
        { path: '/library', label: 'Library' },
        { path: '/settings', label: 'Settings' },
    ]

    it("should Header render correctly", () => {
        render(
            <BrowserRouter>
                <Header title="BlockForge" navigationItems={navigationItems} locationPathname="/settings" />
            </BrowserRouter>
        )
        expect(screen.getByText('BlockForge')).toBeInTheDocument()
        expect(screen.getByRole("heading", { name: 'BlockForge' })).toBeInTheDocument()
    })

    it("should Nav render correctly", () => {
        render(
            <BrowserRouter>
                <Header title="BlockForge" navigationItems={navigationItems} locationPathname="/settings" />
            </BrowserRouter>
        )

        navigationItems.forEach(i => {
            expect(screen.getByRole("link", { name: i.label })).toBeInTheDocument()
        })
    })

    it("should active setting Link correctly in nav", () => {
        render(
            <MemoryRouter initialEntries={['/settings']}>
                <Header title="BlockForge" navigationItems={navigationItems} locationPathname="/settings" />
            </MemoryRouter>
        )

        expect(screen.getByRole("link", { name: "Settings" })).toBeInTheDocument()
        const settingsLink = screen.getByRole("link", { name: "Settings" });
        expect(settingsLink).toHaveClass("active");
    })

    it("should disabled setting Link correctly in nav", () => {
        render(
            <MemoryRouter initialEntries={['/library']}>
                <Header title="BlockForge" navigationItems={navigationItems} locationPathname="/library" />
            </MemoryRouter>
        )

        expect(screen.getByRole("link", { name: "Settings" })).toBeInTheDocument()
        const settingsLink = screen.getByRole("link", { name: "Settings" });
        expect(settingsLink).toHaveClass("disabled");
    })

    // Teste le comportement du composant avec les props par défaut
    describe("Props par défaut", () => {
        it("should use default title when title prop is not provided", () => {
            // Teste que le titre par défaut "BlockForge" est utilisé quand la prop title n'est pas fournie
        })

        it("should render with empty navigation when navigationItems is not provided", () => {
            // Teste que le composant s'affiche correctement avec un tableau de navigation vide
        })
    })

    // Teste le comportement spécial du lien Dashboard
    describe("Lien Dashboard", () => {
        it("should mark dashboard link as active when locationPathname is '/'", () => {
            // Teste que le lien Dashboard est actif quand locationPathname est '/' (route racine)
        })

        it("should mark dashboard link as active when on dashboard route", () => {
            // Teste que le lien Dashboard est actif quand on est sur la route '/dashboard'
        })
    })

    // Teste le switch de thème
    describe("Switch de thème", () => {
        it("should render theme switch", () => {
            // Teste que le switch de thème est présent dans le header
        })

        it("should have switch unchecked by default (light theme)", () => {
            // Teste que le switch est décoché par défaut (thème clair)
        })

        it("should toggle theme when switch is clicked", () => {
            // Teste que le thème change (light/dark) quand on clique sur le switch
        })
    })

    // Teste l'effet du thème sur le document
    describe("Effet du thème sur le document", () => {
        it("should add dark class to body when theme is dark", () => {
            // Teste que la classe 'dark' est ajoutée au body quand le thème est sombre
        })

        it("should remove dark class from body when theme is light", () => {
            // Teste que la classe 'dark' est retirée du body quand le thème est clair
        })
    })

    // Teste les différents états des liens de navigation
    describe("États des liens de navigation", () => {
        it("should mark link as active when isActive is true", () => {
            // Teste qu'un lien est marqué comme actif quand isActive est true
        })

        it("should apply hover styles to inactive links", () => {
            // Teste que les liens inactifs ont les styles de survol appropriés
        })

        it("should render all navigation items with correct paths", () => {
            // Teste que tous les éléments de navigation sont rendus avec leurs chemins corrects
        })
    })

    // Teste le rendu du header
    describe("Structure du header", () => {
        it("should render header with correct layout classes", () => {
            // Teste que le header a les classes CSS correctes pour le layout (flex, justify-between, etc.)
        })

        it("should render navigation in center position", () => {
            // Teste que la navigation est positionnée au centre avec les classes CSS appropriées
        })
    })
})