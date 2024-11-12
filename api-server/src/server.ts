import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
const PORT = 5000;

// Sample data
const sampleData = [
  { id: 1, name: 'Item 1', description: 'This is item 1' },
  { id: 2, name: 'Item 2', description: 'This is item 2' },
  { id: 3, name: 'Item 3', description: 'This is item 3' },
];

// Endpoint to fetch data
app.get('/api/items', (req: Request, res: Response) => {
  res.json(sampleData);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
