import { extendTheme } from "@chakra-ui/react";
import { colors } from "./colors";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  weight: ["400", "600", "700"],
  display: "swap",
  subsets: ["latin-ext"],
});

const theme = extendTheme({
  colors,
  fonts: {
    heading: "Nunito, sans-serif",
    body: "Nunito, sans-serif",
  },
});
export default theme;
