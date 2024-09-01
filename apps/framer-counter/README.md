# @myno/framer-counter

This package provides a set of flexible and customizable countdown timer components for React applications.

## Installation

```bash
npm install @myno/framer-counter
```

## Components

### 1. IncrementDecrementCounter

A counter that increments or decrements by a specified step at a given interval.

```jsx
import { IncrementDecrementCounter } from '@myno/framer-counter';

<IncrementDecrementCounter initialValue={0} step={1} interval={1000} />
```

Props:
- `initialValue` (optional): Initial count value (default: 0)
- `step` (optional): Amount to increment/decrement by (default: 1)
- `interval` (optional): Interval in milliseconds between updates (default: 1000)

### 2. DateCountdown

A countdown timer that shows the time remaining until a specified date.

```jsx
import { DateCountdown } from '@myno/framer-counter';

<DateCountdown targetDate={new Date('2024-12-31')} />
```

Props:
- `targetDate`: The target date to count down to

### 3. DdayCountdown

A D-day countdown that decrements daily.

```jsx
import { DdayCountdown } from '@myno/framer-counter';

<DdayCountdown dday={100} />
```

Props:
- `dday`: The initial D-day number

## Styling

All components use StyleX for styling. You can override styles by passing a `className` prop to the components.

## Development

To run tests:

```bash
npm test
```

To build the package:

```bash
npm run build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.