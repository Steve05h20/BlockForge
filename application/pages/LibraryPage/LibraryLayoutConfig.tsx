import { Typography } from "@blockForge-ui/ui/typography";
import type { LayoutData, DockMode } from "rc-dock";

export const LibraryLayoutConfig: LayoutData = {
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
                id: 'library',
                title: 'Library',
                content: (
                  <div className="p-6">
                    <Typography variant="h1">Library</Typography>
                    <Typography variant="p" className="mt-4">
                      Bibliothèque de blocs et composants
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
