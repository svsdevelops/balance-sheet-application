import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());
const PORT = 4000;

// Route to get Balance Sheet data
app.get('/api/balance-sheet', async (req, res) => {
  const {
    date,
    periods,
    timeframe,
    trackingOptionID1,
    trackingOptionID2,
    standardLayout,
    paymentsOnly,
  } = req.query;

  try {
    const response = await axios.get(
      'https://api.xero.com/api.xro/2.0/Reports/BalanceSheet',
      {
        headers: {
          Authorization: `Bearer XERO_ACCESS_TOKEN`,
        },
        params: {
          date,
          periods,
          timeframe,
          trackingOptionID1,
          trackingOptionID2,
          standardLayout: standardLayout === 'true',
          paymentsOnly: paymentsOnly === 'true',
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching Balance Sheet data:', error);
    res.status(500).json({ error: 'Failed to fetch balance sheet data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
