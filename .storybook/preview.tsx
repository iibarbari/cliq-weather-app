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
      <html lang="en">
        <body className={roboto.variable}>
          <main>
            <Story />
          </main>
        </body>
      </html>
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
