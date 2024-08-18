import * as stylex from '@stylexjs/stylex';
import { motion, AnimatePresence } from 'framer-motion';
import { useDdayTimer } from '../hooks/useDdayTimer';

export interface DateCountdownProps {
  targetDate: Date;
}

const styles = stylex.create({
  container: {
    fontSize: '2rem',
    fontWeight: 'bold',
    display: 'flex',
    gap: '0.5rem',
  },
  timeUnit: {
    display: 'inline-block',
    minWidth: '2rem',
    textAlign: 'center',
  },
});

export const DateCountdown: React.FC<DateCountdownProps> = ({ targetDate }) => {
  const dday = Math.floor((targetDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  const { remainingDays, hour, min, sec, isTimeOver } = useDdayTimer({ dday });

  if (isTimeOver) {
    return <div {...stylex.props(styles.container)}>Time is up!</div>;
  }

  return (
    <div {...stylex.props(styles.container)}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={`days-${remainingDays}`}
          {...stylex.props(styles.timeUnit)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {`${remainingDays}d`}
        </motion.span>

        <motion.span
          key={`hours-${hour}`}
          {...stylex.props(styles.timeUnit)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {`${hour}h`}
        </motion.span>

        <motion.span
          key={`minutes-${min}`}
          {...stylex.props(styles.timeUnit)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {`${min}m`}
        </motion.span>

        <motion.span
          key={`seconds-${sec}`}
          {...stylex.props(styles.timeUnit)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {`${sec}s`}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}