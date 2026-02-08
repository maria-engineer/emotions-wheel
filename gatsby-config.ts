import type { GatsbyConfig } from "gatsby"

const config: GatsbyConfig = {
  siteMetadata: {
    title: "Emotions Wheel",
    description: "A writing exercise app based on Geoffrey Roberts' Feelings Wheel",
    siteUrl: "https://emotions.maria.engineer",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-emotion",
      options: {
        sourceMap: true,
        autoLabel: "dev-only",
        labelFormat: "[local]",
        cssPropOptimization: true,
      },
    },
  ],
}

export default config
