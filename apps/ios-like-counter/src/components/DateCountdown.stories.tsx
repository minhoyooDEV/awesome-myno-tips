import { Meta, StoryObj } from "@storybook/react";
import { DateCountdown, DateCountdownProps } from "./DateCountdown";

export default {
  title: "Components/DateCountdown",
  component: DateCountdown,
} as Meta<DateCountdownProps>;

export const Default: StoryObj<DateCountdownProps> = {
  args: {
    targetDate: new Date(Date.now() + 86400000 * 3), // 3 days from now
  },
};
