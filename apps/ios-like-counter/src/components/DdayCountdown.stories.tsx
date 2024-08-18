import { Meta, StoryObj } from "@storybook/react";
import { DdayCountdown, DdayCountdownProps } from "./DdayCountdown";

export default {
  title: "Components/DdayCountdown",
  component: DdayCountdown,
} as Meta<DdayCountdownProps>;

export const Default: StoryObj<DdayCountdownProps> = {
  args: {
    dday: 100,
  },
};
