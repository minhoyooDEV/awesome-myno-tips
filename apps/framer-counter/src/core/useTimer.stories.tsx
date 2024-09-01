// TimerDisplay.stories.tsx
import React from "react";

import { Meta, StoryObj } from "@storybook/react";

import { useTimer } from "./useTimer"; // useTimer 훅을 import

export const TimerDisplay: React.FC = () => {
  const { years, months, days, hours, minutes, seconds } = useTimer();

  return (
    <div style={{ fontFamily: "monospace", fontSize: "2rem" }}>
      <div>Years: {years}</div>
      <div>Months: {months}</div>
      <div>Days: {days}</div>
      <div>Hours: {hours}</div>
      <div>Minutes: {minutes}</div>
      <div>Seconds: {seconds}</div>
    </div>
  );
};

const meta: Meta<typeof TimerDisplay> = {
  title: 'Hooks/TimerDisplay',
  component: TimerDisplay,
};

export default meta;

type Story = StoryObj<typeof TimerDisplay>;

export const Default: Story = {};