// DdayDisplay.tsx
import React from "react";
import { useDdayTimer } from "./useDdayTimer"; // useDdayTimer 훅을 import
import type { Meta, StoryObj } from "@storybook/react";

interface DdayDisplayProps {
  ddayDate: Date | number;
}

export const DdayDisplay: React.FC<DdayDisplayProps> = ({ ddayDate }) => {
  const { years, months, dday, hours, minutes, seconds, isOverTime } =
    useDdayTimer(ddayDate);

  return (
    <div
      style={{ fontFamily: "monospace", fontSize: "2rem", textAlign: "center" }}
    >
      {isOverTime ? (
        <div>Time is over!</div>
      ) : (
        <>
          <div>Dday: {dday}</div>
          <div>Hours: {hours}</div>
          <div>Minutes: {minutes}</div>
          <div>Seconds: {seconds}</div>
        </>
      )}
    </div>
  );
};

const meta: Meta<typeof DdayDisplay> = {
  title: "Hooks/DdayDisplay",
  component: DdayDisplay,
};

export default meta;

type Story = StoryObj<typeof DdayDisplay>;

export const DDay10: Story = {
  args: {
    ddayDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10), // 10일 후를 목표로 설정
  },
};

export const DDay1: Story = {
  args: {
    ddayDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1), // 10일 후를 목표로 설정
  },
};

export const DDayTodayWithNumber: Story = {
  args: {
    ddayDate: 0, // 오늘을 후를 목표로 설정
  },
};
export const DDay1WithNumber: Story = {
  args: {
    ddayDate: 1, // 1일 후를 목표로 설정
  },
};

export const OneMinuteCountdown: Story = {
  args: {
    ddayDate: new Date(Date.now() + 1000 * 60), // 1분 후를 목표로 설정
  },
};

export const TimeOver: Story = {
  args: {
    ddayDate: new Date(Date.now() - 1000 * 60 * 60 * 24), // 이미 지난 날짜
  },
};
