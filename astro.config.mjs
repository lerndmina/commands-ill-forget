import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Commands.Wiki",
      head: [
        {
          tagName: "meta",
          attributes: {
            name: "darkreader-lock",
          },
        },
      ],
      social: {
        github: "https://github.com/lerndmina/commands-wiki",
      },
      favicon: "/mascot_favicon_trimmed.ico",
      sidebar: [
        {
          label: "Intro",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "A brief Intro", link: "/intro/" },
          ],
        },
        {
          label: "Commands",
          autogenerate: { directory: "commands" },
        },
      ],
    }),
  ],
});
