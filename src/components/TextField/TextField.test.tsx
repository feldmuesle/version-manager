import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../../test-utils';
import { TextField } from '../TextField';

const defaultProps = {
  label: 'Input label',
  name: 'input',
};

describe('rendering', () => {
  it('renders without crashing', () => {
    renderWithTheme(<TextField {...defaultProps} />);
  });

  it('renders label', () => {
    renderWithTheme(<TextField {...defaultProps} />);
    expect(screen.getByLabelText('Input label')).toBeInTheDocument();
  });

  it('renders value', () => {
    renderWithTheme(<TextField {...defaultProps} value='Input value' />);
    const input = screen.getByRole('textbox');

    expect(input).toHaveValue('Input value');
  });
});

describe('event handlers', () => {
  it(`calls 'onChange' when typing`, async () => {
    const onChange = jest.fn();

    renderWithTheme(<TextField {...defaultProps} onChange={onChange} />);
    const input = screen.getByRole('textbox');
    const text = 'my text';

    await act(async () => {
      await userEvent.type(input, text);
    });

    expect(input).toHaveValue(text);
    expect(onChange).toBeCalledTimes(text.length);
  });
});
