import * as stylex from "@stylexjs/stylex";
import { motion, AnimatePresence } from "framer-motion";
import { useTimer } from "../core/useTimer";
import { Fragment } from "react/jsx-runtime";
import { forwardRef, PropsWithChildren } from "react";
import { useCoreTimer } from "../core/useCoreTimer";
import { padStartedRemainingTime } from "../core/utils";

export interface DateCountdownProps {
  targetDate: Date;
}

const styles = stylex.create({
  container: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    fontWeight: "bold",
    display: "flex",
  },
  timeUnit: {
    fontSize: 32,
    display: "inline-block",
    width: 30,
    textAlign: "center",
  },
});

export const DateCountdown: React.FC<DateCountdownProps> = ({ targetDate }) => {
  const { currentTime } = useCoreTimer();
  const { years, months, days, hours, minutes, seconds } =
    padStartedRemainingTime(currentTime);

  return (
    <div style={{ display: "inline-flex", overflow: "hidden" }}>
      <AnimatePresence mode="popLayout">
        {[years, months, days].map((time, timeIdx) => (
          <Fragment key={`${timeIdx}-${time}`}>
            {timeIdx ? <span {...stylex.props(styles.timeUnit)}>-</span> : null}
            {time.split("").map((digit, digitIdx) => (
              <Digit key={digit + "-" + digitIdx}>{`${digit}`}</Digit>
            ))}
          </Fragment>
        ))}
      </AnimatePresence>

      <div style={{ width: 14, whiteSpace: "nowrap" }} />

      {[hours, minutes, seconds].map((time, timeIdx) => {
        const values = time.split("");
        return (
          <Fragment key={`${timeIdx}`}>
            {timeIdx ? <span {...stylex.props(styles.timeUnit)}>:</span> : null}
            <AnimatePresence mode="popLayout" initial={false}>
              {values.map((digit, digitIdx) => (
                <Digit key={digit + "_" + digitIdx}>{digit}</Digit>
              ))}
            </AnimatePresence>
          </Fragment>
        );
      })}
    </div>
  );
};

const Digit = forwardRef<HTMLSpanElement, PropsWithChildren<any>>(
  ({ children }, ref) => {
    return (
      <motion.span
        ref={ref} // Forwarded ref is passed here
        {...stylex.props(styles.timeUnit)}
        transition={{
          type: "spring",
          duration: 0.9,
          bounce: 0.3,
        }}
        initial={{ opacity: 0, y: 40, x: 0, rotateX: 120, scale: 0.5 }}
        animate={{ opacity: 1, y: 0, x: 0, rotateX: 0, scale: 1 }}
        exit={{
          opacity: 0,
          y: -10,
          rotateX: 60,
          scale: 0.2,
        }}
      >
        {children}
      </motion.span>
    );
  }
);
