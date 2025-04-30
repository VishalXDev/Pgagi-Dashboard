import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../src/components/ui/Button';

describe('Button component', () => {
  it('renders with provided text', () => {
    render(<Button text="Click me" onClick={() => {}} />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button text="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
