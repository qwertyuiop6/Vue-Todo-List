//@ts-check
import { defineConfig } from "windicss/helpers";
import colors from "windicss/colors";

export default defineConfig({
  theme: {
    extend: {
      colors: {
        blue: colors.sky,
        red: colors.rose,
      },
    },
  },
  attributify: true,
});
