import type { Meta, StoryObj } from "@storybook/react";

import Header, { HeaderProps } from "@/components/Header";

const meta: Meta<HeaderProps> = {
  component: Header,
};

export default meta;
type Story = StoryObj<HeaderProps>;

export const Default: Story = {
  args: {},
};
