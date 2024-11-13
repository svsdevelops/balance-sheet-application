import React, { useState } from 'react';
import axios from 'axios';
import Input from '../re-use-components/Input';
import Select from '../re-use-components/Select';

type BalanceSheetData = {
  reportDate: string;
  Reports: Array<{
    name: string;
    amount: number;
    amountPreviousYear: number;
    RowType: string;
    Cells: [];
    value: string;
  }>;
};

const BalanceSheet: React.FC = () => {
  const [data, setData] = useState<BalanceSheetData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [date, setDate] = useState('');
  const [periods, setPeriods] = useState(1);
  const [timeframe, setTimeframe] = useState('MONTH');
  const [standardLayout, setStandardLayout] = useState(false);
  const [paymentsOnly, setPaymentsOnly] = useState(false);

  const options = [
    { value: 'MONTH', label: 'Month' },
    { value: 'QUARTER', label: 'Quarter' },
    { value: 'YEAR', label: 'Year' },
  ];

  const fetchBalanceSheet = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        'http://localhost:4000/api/balance-sheet',
        {
          params: {
            date,
            periods,
            timeframe,
            standardLayout,
            paymentsOnly,
          },
        }
      );
      setData(response.data);
    } catch (err) {
      setError('Error fetching balance sheet data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Balance Sheet</h1>
      <div style={{ display: 'flex' }}>
        <Input
          id='date'
          label='Date: '
          type='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Input
          id='period'
          label='Periods: '
          type='number'
          min='1'
          max='11'
          value={periods}
          onChange={(e) => setPeriods(Number(e.target.value))}
        />
        <Select
          id='timeframe'
          label='Timeframe: '
          value={timeframe}
          options={options}
          onChange={(e) => setTimeframe(e.target.value)}
        />
        <Input
          id='standard'
          label='Standard Layout: '
          type='checkbox'
          checked={standardLayout}
          onChange={(e) => setStandardLayout(e.target.checked)}
        />
        <Input
          id='payment'
          label='Payments Only: '
          type='checkbox'
          checked={paymentsOnly}
          onChange={(e) => setPaymentsOnly(e.target.checked)}
        />
        <button onClick={fetchBalanceSheet}>Fetch Balance Sheet</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {data && (
        <table>
          <thead>
            <tr>
              <th>Account</th>
              <th>Amount (Current)</th>
              <th>Amount (Previous Year)</th>
            </tr>
          </thead>
          <tbody>
            {data?.Reports.map((item, index) => (
              <tr key={index}>
                <td>{item.RowType}</td>
                <td>{item.Cells}</td>
                <td>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BalanceSheet;
