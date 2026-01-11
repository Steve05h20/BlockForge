import { Typography } from "@blockForge-ui/ui/typography";
import type { LayoutData, DockMode } from "rc-dock";

export const SettingsLayoutConfig: LayoutData = {
  dockbox: {
    mode: 'horizontal',
    children: [
      {
        mode: 'horizontal' as DockMode,
        size: 15,
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
                id: 'settings',
                title: 'Settings',
                content: (
                  <div className="p-6">
                    <Typography variant="h1">Settings</Typography>
                    <Typography variant="p" className="mt-4">
                      Paramètres de l'application
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
