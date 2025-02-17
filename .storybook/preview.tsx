import type { Preview } from "@storybook/react";
import "@/app/globals.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "700", "900"],
});

const preview: Preview = {
  decorators: [
    (Story) => (
      <main className={roboto.className}>
        <Story />
      </main>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
