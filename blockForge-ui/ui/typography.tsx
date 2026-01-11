import * as React from "react"
import { cn } from "../lib/utils"

// Configuration des classes pour chaque variant
const typographyVariants = {
    h1: {
        element: "h1" as const,
        className: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
    },
    h2: {
        element: "h2" as const,
        className: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
    },
    h3: {
        element: "h3" as const,
        className: "scroll-m-20 text-2xl font-semibold tracking-tight",
    },
    h4: {
        element: "h4" as const,
        className: "scroll-m-20 text-xl font-semibold tracking-tight",
    },
    p: {
        element: "p" as const,
        className: "leading-7 [&:not(:first-child)]:mt-6",
    },
    blockquote: {
        element: "blockquote" as const,
        className: "mt-6 border-l-2 pl-6 italic",
    },
    list: {
        element: "ul" as const,
        className: "my-6 ml-6 list-disc [&>li]:mt-2",
    },
    code: {
        element: "code" as const,
        className: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
    },
    lead: {
        element: "p" as const,
        className: "text-xl text-muted-foreground",
    },
    large: {
        element: "div" as const,
        className: "text-lg font-semibold",
    },
    small: {
        element: "small" as const,
        className: "text-sm font-medium leading-none",
    },
    muted: {
        element: "p" as const,
        className: "text-sm text-muted-foreground",
    },
} as const

export type TypographyVariant = keyof typeof typographyVariants

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
    variant?: TypographyVariant
    as?: React.ElementType
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
    ({ variant = "p", className, as, ...props }, ref) => {
        const config = typographyVariants[variant]
        const Component = (as || config.element) as React.ElementType

        return (
            <Component
                ref={ref}
                className={cn(config.className, className)}
                {...props}
            />
        )
    }
)
Typography.displayName = "Typography"

export { Typography }
