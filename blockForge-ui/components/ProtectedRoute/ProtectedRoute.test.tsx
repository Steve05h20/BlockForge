import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProtectedRoute from './ProtectedRoute'

describe('ProtectedRoute', () => {

    vi.mock("react-router-dom", () => ({
        useNavigate: () => vi.fn(),
    }))
    it("shhould show error page when not connected", () => {
        render(
            <ProtectedRoute isConnected={false} isAuthorized={false}>
                <div>Contenu protégé</div>
            </ProtectedRoute>
        )
        expect(screen.getByText('Non connecté')).toBeInTheDocument()
        expect(screen.queryByText('Contenu protégé')).not.toBeInTheDocument()

    })

    it("should show error page when not authorized", () => {
        render(
            <ProtectedRoute isConnected={true} isAuthorized={false}>
                <div >Contenu protégé</div>
            </ProtectedRoute>
        )
        expect(screen.getByText('Accès refusé')).toBeInTheDocument()
        expect(screen.queryByText('Contenu protégé')).not.toBeInTheDocument()
    })

    it("should render children when user is connected and authorized",()=>{
        render(<ProtectedRoute isAuthorized isConnected>
            <div>Protected Content</div>
        </ProtectedRoute>)

        expect(screen.getByText("Protected Content")).toBeInTheDocument()
        expect(screen.getByText("Protected Content").tagName.toLowerCase()).toBe("div")

        expect(screen.queryByText('Accès refusé')).not.toBeInTheDocument()
        expect(screen.queryByText('Non connecté')).not.toBeInTheDocument()
    })

})
