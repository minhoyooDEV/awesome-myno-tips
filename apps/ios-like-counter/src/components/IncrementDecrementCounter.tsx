import React from "react";
import { useCounter } from "../hooks/useCounter";
import * as stylex from "@stylexjs/stylex";

export interface IncrementDecrementCounterProps {
  initialValue?: number;
  step?: number;
  interval?: number;
}

const styles = stylex.create({
  container: {
    fontSize: "2rem",
    fontWeight: "bold",
  },
});

export const IncrementDecrementCounter: React.FC<
  IncrementDecrementCounterProps
> = ({ initialValue = 0, step = 1, interval = 1000 }) => {
  const count = useCounter(initialValue, step, interval);

  return <div {...stylex.props(styles.container)}>{count}</div>;
};

