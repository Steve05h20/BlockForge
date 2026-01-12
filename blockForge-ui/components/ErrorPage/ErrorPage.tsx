import { Typography } from "@blockForge-ui/ui/typography"
import { Button } from "@blockForge-ui/ui/button"
import { useNavigate } from "react-router-dom"

interface ErrorPageProps {
    errorCode?: number | string
    title?: string
    message?: string
    showBackButton?: boolean
    backButtonText?: string
    onBack?: () => void
}

export default function ErrorPage({
    errorCode = 404,
    title,
    message,
    showBackButton = true,
    backButtonText = "Retour à l'accueil",
    onBack,
}: ErrorPageProps) {
    const navigate = useNavigate()

    const defaultTitles: Record<string | number, string> = {
        404: "Page non trouvée",
        500: "Erreur serveur",
        403: "Accès refusé",
        401: "Non autorisé",
    }

    const defaultMessages: Record<string | number, string> = {
        404: "La page que vous recherchez n'existe pas ou a été déplacée.",
        500: "Une erreur interne s'est produite. Veuillez réessayer plus tard.",
        403: "Vous n'avez pas les permissions nécessaires pour accéder à cette ressource.",
        401: "Vous devez être connecté pour accéder à cette page.",
    }

    const errorTitle = title || defaultTitles[errorCode] || "Une erreur s'est produite"
    const errorMessage = message || defaultMessages[errorCode] || "Une erreur inattendue s'est produite."

    const handleBack = () => {
        if (onBack) {
            onBack()
        } else {
            navigate("/")
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-full min-h-screen p-8">
            <div className="text-center space-y-6 max-w-md">
                <Typography variant="h1" className="text-6xl font-bold text-muted-foreground">
                    {errorCode}
                </Typography>
                <Typography variant="h2" className="mt-4">
                    {errorTitle}
                </Typography>
                <Typography variant="p" className="text-muted-foreground">
                    {errorMessage}
                </Typography>
                {showBackButton && (
                    <Button onClick={handleBack} className="mt-6">
                        {backButtonText}
                    </Button>
                )}
            </div>
        </div>
    )
}
