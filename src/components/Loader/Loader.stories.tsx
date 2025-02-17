import type { Meta, StoryObj } from "@storybook/react";
import Loader, { LoaderProps } from "@/components/Loader";

const meta: Meta<LoaderProps> = {
  argTypes: {
    color: { control: "select", options: ["default", "primary"] },
    role: { control: "text" },
  },
  component: Loader,
};

export default meta;
type Story = StoryObj<LoaderProps>;

export const Default: Story = {
  args: {
    color: "default",
    role: "status",
  },
};
