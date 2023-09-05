import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../../test-utils';
import { OPTIONS, VersionsControl } from '../VersionsControl';

describe('rendering', () => {
  it('renders without crashing', () => {
    renderWithTheme(<VersionsControl />);
  });

  it('displays heading', () => {
    renderWithTheme(<VersionsControl />);
    const heading = screen.getByText(/Versions/i);
    expect(heading).toBeInTheDocument();
  });

  it('displays "Add version" button', () => {
    renderWithTheme(<VersionsControl />);
    const addVersionBtn = screen.getByText(/Add version/i);
    expect(addVersionBtn).toBeInTheDocument();
  });

  it('displays form inputs when "Add version" button is clicked', async () => {
    renderWithTheme(<VersionsControl />);
    const addVersionBtn = screen.getByText(/Add version/i);
    userEvent.click(addVersionBtn);

    const operatorSelect = await screen.findByLabelText(/Operator/i);
    const versionInput = screen.getByLabelText(/Version/i);

    expect(operatorSelect).toBeInTheDocument();
    expect(versionInput).toBeInTheDocument();
  });

  it('shows all operators as options', async () => {
    renderWithTheme(<VersionsControl />);
    const addVersionBtn = screen.getByText(/Add version/i);
    userEvent.click(addVersionBtn);

    const operatorSelect = await screen.findByLabelText(/Operator/i);
    userEvent.click(operatorSelect);

    const options = await screen.findAllByRole('option');
    options.forEach((option, i) => {
      expect(option).toHaveAttribute('data-value', OPTIONS[i].value.toString());
      expect(option).toHaveTextContent(OPTIONS[i].label);
    });

    expect(options.length).toEqual(OPTIONS.length);
  });
});

describe('user interactions', () => {
  it('can add a version and hides input section thereafter', async () => {
    renderWithTheme(<VersionsControl />);
    const addVersionBtn = screen.getByText(/Add version/i);
    userEvent.click(addVersionBtn);

    const versionInput = await screen.findByRole('textbox');
    const addBtn = await screen.findByText(/Add/i);

    await act(async () => {
      await userEvent.type(versionInput, '1.2.3');
    });
    userEvent.click(addBtn);

    const version = await screen.findByText('1.2.3');

    expect(version).toBeInTheDocument();
    expect(versionInput).not.toBeInTheDocument();
  });

  it('can update a version', async () => {
    renderWithTheme(<VersionsControl />);
    const addVersionBtn = screen.getByText(/Add version/i);
    userEvent.click(addVersionBtn);

    const versionInput = await screen.findByRole('textbox');
    const addBtn = await screen.findByText(/Add/i);

    await act(async () => {
      await userEvent.type(versionInput, '1.2.3');
    });
    userEvent.click(addBtn);

    const version = await screen.findByText('1.2.3');
    userEvent.click(version);

    const saveBtn = await screen.findByText(/Save/i);
    const updateVersionInput = await screen.findByRole('textbox');

    await act(async () => {
      await userEvent.type(updateVersionInput, '{backspace}4');
      userEvent.click(saveBtn);
    });

    const updatedVersion = await screen.findByText('1.2.4');
    const oldVersion = screen.queryByText('1.2.3');

    expect(updatedVersion).toBeInTheDocument();
    expect(oldVersion).not.toBeInTheDocument();
    expect(versionInput).not.toBeInTheDocument();
  });

  it('can delete a version', async () => {
    renderWithTheme(<VersionsControl />);
    const addVersionBtn = screen.getByText(/Add version/i);
    userEvent.click(addVersionBtn);

    const versionInput = await screen.findByRole('textbox');
    const addBtn = await screen.findByText(/Add/i);

    await act(async () => {
      await userEvent.type(versionInput, '1.2.3');
    });
    userEvent.click(addBtn);

    const version = await screen.findByText('1.2.3');
    userEvent.click(version);

    const deleteBtn = await screen.findByTestId('CloseIcon');

    await act(async () => {
      await userEvent.click(deleteBtn);
    });

    expect(version).not.toBeInTheDocument();
    expect(versionInput).not.toBeInTheDocument();
  });
});

describe('validation', () => {
  it('accepts values in format [num].[num].[num]', async () => {
    renderWithTheme(<VersionsControl />);
    const addVersionBtn = screen.getByText(/Add version/i);
    userEvent.click(addVersionBtn);

    const versionInput = await screen.findByRole('textbox');
    const addBtn = await screen.findByText(/Add/i);

    await act(async () => {
      await userEvent.type(versionInput, '1.2.3');
    });
    userEvent.click(addBtn);
    const version = await screen.findByText('1.2.3');
    expect(version).toBeInTheDocument();

    const error = screen.queryByText(
      'Version must be formatted as [num].[num].[num]'
    );

    expect(error).not.toBeInTheDocument();
  });

  test.each(['text', '123', '1.23.', '1.2.3.', '1.2.3.4'])(
    'displays an error if value typed in is %p',
    async (inputValue) => {
      renderWithTheme(<VersionsControl />);
      const addVersionBtn = screen.getByText(/Add version/i);
      userEvent.click(addVersionBtn);

      const versionInput = await screen.findByRole('textbox');
      const addBtn = await screen.findByText(/Add/i);

      await act(async () => {
        await userEvent.type(versionInput, inputValue);
      });
      userEvent.click(addBtn);

      const error = await screen.findByText(
        'Version must be formatted as [num].[num].[num]'
      );

      expect(error).toBeInTheDocument();
    }
  );
});
