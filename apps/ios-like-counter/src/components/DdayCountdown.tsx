

import { useCounter } from '../hooks/useCounter';
import * as stylex from '@stylexjs/stylex';

export interface DdayCountdownProps {
  dday: number;
}

const styles = stylex.create({
  container: {
    fontSize: '2rem',
    fontWeight: 'bold',
  },
});

export const DdayCountdown: React.FC<DdayCountdownProps> = ({ dday }) => {
  const count = useCounter(dday, -1, 86400000); // 86400000 ms = 1 day

  return <div {...stylex.props(styles.container)}>{`D-${count}`}</div>;
};
