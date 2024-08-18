

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DdayCountdown } from './DdayCountdown';

vi.useFakeTimers();

describe('DdayCountdown', () => {
  it('renders initial D-day', () => {
    render(<DdayCountdown dday={10} />);
    expect(screen.getByText('D-10')).toBeInTheDocument();
  });

  it('decrements D-day every day', () => {
    render(<DdayCountdown dday={10} />);
    vi.advanceTimersByTime(86400000); // Advance by 1 day
    expect(screen.getByText('D-9')).toBeInTheDocument();
  });
});
