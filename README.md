BalanceSheet Component 

A reusable BalanceSheet component in React, built with TypeScript and styled components. It allows users to fetch and display balance sheet data from a backend API, with form controls for date, periods, timeframe, and more.

Features Customizable form inputs for date, periods, timeframe, and options like standard layout and payments-only. Fetches data from a backend API using Axios. Displays balance sheet data in a table format. Loading and error handling states. Fully tested using Jest and React Testing Library. Technologies Used React TypeScript Styled Components Axios Jest and React Testing Library (for tests) Getting Started Prerequisites Make sure you have Node.js and npm installed. You’ll also need to set up the backend API endpoint (http://localhost:4000/api/balance-sheet), or change the URL to match your API.

Installation Clone the repository:

bash Copy code git clone https://github.com/your-username/your-repo-name.git cd your-repo-name Install dependencies:

bash Copy code npm install Usage Start the development server:

bash Copy code npm start Navigate to http://localhost:3000 to view the component in action.

Customize form inputs and click "Fetch Balance Sheet" to request data from the API.

Folder Structure BalanceSheet.tsx: The main component file. Input.tsx and Select.tsx: Reusable input and select field components located in re-use-components/. tests/BalanceSheet.test.tsx: Test cases for the BalanceSheet component. Component Overview Props This component doesn't require external props but relies on local state for the following fields:

Date: The report date for the balance sheet. Periods: Number of periods to fetch (numeric value from 1 to 11). Timeframe: The timeframe of the report (options: MONTH, QUARTER, YEAR). Standard Layout: Boolean for whether to use a standard layout. Payments Only: Boolean to limit the report to payments only. API Call The component makes a GET request to the endpoint defined in fetchBalanceSheet() with the parameters for date, periods, timeframe, and layout options.

Testing Running Tests Run the tests using the following command:

bash Copy code npm test Tests Included Render and Initial State: Verifies that form inputs and buttons render correctly. Input Changes: Tests that form inputs update their values correctly. API Fetch and Display Data: Tests a successful API call and checks that data is displayed in the table. Error Handling: Tests error handling by simulating a failed API call. Mocking Axios Axios is mocked to simulate API requests and responses in tests, ensuring they run independently and do not make actual network requests.

Example Usage in App Here’s an example of how to use the BalanceSheet component in an application.

typescript Copy code import React from 'react'; import BalanceSheet from './components/BalanceSheet';

const App: React.FC = () => { return (

); };
export default App; License This project is licensed under the MIT License.

