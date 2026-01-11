import { Typography } from "@blockForge-ui/ui/typography";
import type { LayoutData, DockMode } from "rc-dock";

export const DashboardLayoutConfig: LayoutData = {
  dockbox: {
    mode: 'horizontal',
    children: [
      {
        mode: 'horizontal' as DockMode,
        size: 15,
        panelLock: {},
        children: [
          {
            tabs: [
              {
                id: 'left-panel',
                title: 'left-panel',
                content: <Typography variant="blockquote">Left Panel</Typography>,
              },
            ],
          },
        ],
      },
      {
        mode: 'vertical' as DockMode,
        size: 70,
        children: [
          {
            tabs: [
              {
                id: 'dashboard',
                title: 'Dashboard',
                content: (
                  <div className="p-6">
                    <Typography variant="h1">Dashboard</Typography>
                    <Typography variant="p" className="mt-4">
                      Page d'accueil du tableau de bord
                    </Typography>
                  </div>
                ),
              },
            ],
          },
        ],
      },
    ],
  },
}
