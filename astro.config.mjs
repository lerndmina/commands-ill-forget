import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Commands.Wiki",
      head: [
        {
          tag: "meta",
          attrs: {
            name: "darkreader-lock",
          },
        },
      ],
      editLink: {
        baseUrl: "https://github.com/lerndmina/commands-wiki/edit/master/",
      },
      social: {
        github: "https://github.com/lerndmina/commands-wiki",
      },
      favicon: "/mascot_favicon_trimmed.ico",
      lastUpdated: true,
      titleDelimiter: "•",
      sidebar: [
        {
          label: "Intro",
          items: [
            // Each item here is one entry in the navigation menu.
            {
              label: "A brief Intro",
              link: "/intro/",
            },
          ],
        },
        {
          label: "Commands",
          autogenerate: {
            directory: "commands",
          },
        },
        {
          label: "Tutorials",
          autogenerate: { directory: "tutorials" },
        },
      ],
    }),
  ],
});
