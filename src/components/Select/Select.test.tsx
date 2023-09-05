import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../../test-utils';
import { Select, SelectProps } from '../Select';

const defaultProps: SelectProps = {
  label: 'Label',
  name: 'select',
  options: [
    { value: '1', label: 'Cat' },
    { value: '2', label: 'Dragon' },
    { value: '3', label: 'Unicorn' },
  ],
  onChange: jest.fn(),
};

describe('Select', () => {
  it('renders without crashing', () => {
    renderWithTheme(<Select {...defaultProps} />);
  });

  it('renders label if provided', () => {
    renderWithTheme(<Select {...defaultProps} label='Label' />);
    const label = screen.getByLabelText('Label');

    expect(label).toBeInTheDocument();
  });

  it('renders all given options', async () => {
    renderWithTheme(<Select {...defaultProps} />);
    const button = screen.getByRole('button');

    userEvent.click(button);
    const options = await screen.findAllByRole('option');

    options.forEach((option, i) => {
      expect(option).toHaveAttribute(
        'data-value',
        defaultProps.options[i].value.toString()
      );
      expect(option).toHaveTextContent(defaultProps.options[i].label);
    });
    expect(options.length).toEqual(3);
  });

  it('renders with option set if selectedValue if provided', async () => {
    renderWithTheme(<Select {...defaultProps} selectedValue='2' />);

    const button = await screen.findByRole('button');

    expect(button).toHaveTextContent('Dragon');
    userEvent.click(button);

    const options = await screen.findAllByRole('option');

    expect(options[1]).toHaveAttribute('aria-selected', 'true');
  });
});

describe('event handlers', () => {
  it(`calls 'onChange' when option is clicked`, async () => {
    const onChange = jest.fn();
    renderWithTheme(<Select {...defaultProps} onChange={onChange} />);
    const button = screen.getByRole('button');

    userEvent.click(button);
    const option = await screen.findByText('Cat');

    await act(async () => {
      await userEvent.click(option);
    });

    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith('1');
  });
});
