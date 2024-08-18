

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DateCountdown } from './DateCountdown';

vi.useFakeTimers();

describe('DateCountdown', () => {
  it('renders initial countdown', () => {
    const targetDate = new Date(Date.now() + 86400000); // 1 day from now
    render(<DateCountdown targetDate={targetDate} />);
    expect(screen.getByText('1d 0h 0m 0s')).toBeInTheDocument();
  });

  it('updates countdown every second', () => {
    const targetDate = new Date(Date.now() + 86400000); // 1 day from now
    render(<DateCountdown targetDate={targetDate} />);
    vi.advanceTimersByTime(1000);
    expect(screen.getByText('0d 23h 59m 59s')).toBeInTheDocument();
  });
});