import { Meta, StoryObj } from "@storybook/react";
import {
  IncrementDecrementCounter,
  IncrementDecrementCounterProps,
} from "./IncrementDecrementCounter";

export default {
  title: "Components/IncrementDecrementCounter",
  component: IncrementDecrementCounter,
} as Meta<IncrementDecrementCounterProps>;

export const Default: StoryObj<IncrementDecrementCounterProps> = {
  args: {
    initialValue: 0,
    step: 1,
    interval: 1000,
  },
};

export const Decrementing: StoryObj<IncrementDecrementCounterProps> = {
  args: {
    initialValue: 100,
    step: -1,
    interval: 1000,
  },
};
