import React from 'react'
import ErrorPage from "../ErrorPage/ErrorPage"

export interface ProtectedRouteProps {
    children: React.ReactNode
    isConnected: boolean
    isAuthorized: boolean
}

export default function ProtectedRoute({ children, isConnected, isAuthorized }: ProtectedRouteProps): React.ReactNode {

    //check connection
    if (!isConnected) {
        return <ErrorPage
            errorCode={401}
            title="Non connecté"
            message="Vous devez être connecté pour accéder à cette page."
        />
    }
    // check permissions
    if (!isAuthorized) {
        return <ErrorPage
            errorCode={403}
            title="Accès refusé"
            message="Vous n'avez pas les permissions nécessaires pour accéder à cette ressource."
        />
    }

    return children
}
