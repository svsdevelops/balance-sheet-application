import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import BalanceSheet from './BalanceSheet';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('BalanceSheet Component', () => {
  beforeEach(() => {
    mockedAxios.get.mockClear();
  });

  test('renders Balance Sheet component with form inputs and button', () => {
    render(<BalanceSheet />);

    expect(screen.getByLabelText(/Date:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Periods:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Timeframe:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Standard Layout:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Payments Only:/)).toBeInTheDocument();
    expect(screen.getByText('Fetch Balance Sheet')).toBeInTheDocument();
  });

  test('allows user to change form inputs', () => {
    render(<BalanceSheet />);

    const dateInput = screen.getByLabelText(/Date:/);
    fireEvent.change(dateInput, { target: { value: '2023-01-01' } });
    expect(dateInput).toHaveValue('2023-01-01');

    const periodsInput = screen.getByLabelText(/Periods:/);
    fireEvent.change(periodsInput, { target: { value: '3' } });
    expect(periodsInput).toHaveValue(3);

    const timeframeSelect = screen.getByLabelText(/Timeframe:/);
    fireEvent.change(timeframeSelect, { target: { value: 'QUARTER' } });
    expect(timeframeSelect).toHaveValue('QUARTER');

    const standardLayoutCheckbox = screen.getByLabelText(/Standard Layout:/);
    fireEvent.click(standardLayoutCheckbox);
    expect(standardLayoutCheckbox).toBeChecked();

    const paymentsOnlyCheckbox = screen.getByLabelText(/Payments Only:/);
    fireEvent.click(paymentsOnlyCheckbox);
    expect(paymentsOnlyCheckbox).toBeChecked();
  });

  test('fetches balance sheet data on button click and displays it', async () => {
    const mockData = {
      reportDate: '2023-01-01',
      Reports: [
        {
          name: 'Account1',
          amount: 1000,
          amountPreviousYear: 800,
          RowType: 'Account',
          Cells: [],
          value: '1000',
        },
      ],
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    render(<BalanceSheet />);

    fireEvent.click(screen.getByText('Fetch Balance Sheet'));

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    );

    expect(screen.getByText('Account')).toBeInTheDocument();
    expect(screen.getByText('Amount (Current)')).toBeInTheDocument();
    expect(screen.getByText('Amount (Previous Year)')).toBeInTheDocument();
    expect(screen.getByText('1000')).toBeInTheDocument();
  });

  test('displays error message when fetching data fails', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(<BalanceSheet />);

    fireEvent.click(screen.getByText('Fetch Balance Sheet'));

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    );

    expect(
      screen.getByText('Error fetching balance sheet data')
    ).toBeInTheDocument();
  });
});
