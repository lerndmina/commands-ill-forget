import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Commands.Wiki",
      social: {
        github: "https://github.com/lerndmina/commands-wiki",
      },
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
