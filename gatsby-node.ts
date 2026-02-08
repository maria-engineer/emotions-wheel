import type { GatsbyNode } from "gatsby"

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({
  actions,
}) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.csv$/,
          use: "raw-loader",
        },
      ],
    },
  })
}
