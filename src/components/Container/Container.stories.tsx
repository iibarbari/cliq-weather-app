import type { Meta, StoryObj } from "@storybook/react";
import Container, { ContainerProps } from "@/components/Container";

const meta: Meta<ContainerProps> = {
  argTypes: {
    children: { control: "text" },
    className: { control: "text" },
  },
  component: Container,
  parameters: {
    viewport: {
      defaultViewport: "responsive",
    },
  },
};

export default meta;
type Story = StoryObj<ContainerProps>;

export const Default: Story = {
  args: {
    children: "This is a default container",
    style: { border: "1px solid black" },
  },
};

export const SmallScreen: Story = {
  args: {
    ...Default.args,
    children: "This is a container on a small screen",
  },
};

SmallScreen.parameters = {
  viewport: { defaultViewport: "mobile1" },
};

export const LargeMobile: Story = {
  args: {
    ...Default.args,
    children: "This is a container on a large mobile screen",
  },
};

LargeMobile.parameters= {
  viewport: { defaultViewport: "mobile2" }
}


export const LargeScreen: Story = {
  args: {
    ...Default.args,
    children: "This is a container on a small screen",
  },
};

LargeScreen.parameters= {
  viewport: { defaultViewport: "desktop" }
}
