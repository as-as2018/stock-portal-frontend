import { useState } from 'react';
import API from '../api';

export default function BulkUpload() {
    const [jsonInput, setJsonInput] = useState(`[
  {
    "stock_name": "Apple",
    "quantity": 100,
    "broker_name": "Broker A",
    "price": 150
  },
  {
    "stock_name": "Apple",
    "quantity": 200,
    "broker_name": "Broker B",
    "price": 160
  },
  {
    "stock_name": "Apple",
    "quantity": -150,
    "broker_name": "Broker A",
    "price": 170
  }
]`);
    const [mode, setMode] = useState('FIFO');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');

    const handleUpload = async () => {
        try {
            const trades = JSON.parse(jsonInput);
            const res = await API.post('/trades/bulk', { trades, mode });
            setResponse(res.data);
            setError('');
        } catch (err) {
            setError('Invalid input or server error.');
            setResponse(null);
        }
    };

    return (
        <div className="bg-white p-6 mt-8 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Bulk Trade Upload</h2>
            <textarea
                rows={10}
                className="w-full p-3 border rounded font-mono text-sm"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
            />
            <div className="flex items-center mt-4">
                <label className="mr-2 font-semibold">Mode:</label>
                <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="FIFO">FIFO</option>
                    <option value="LIFO">LIFO</option>
                </select>
            </div>
            <button
                onClick={handleUpload}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Upload Trades
            </button>
            {response && (
                <pre className="mt-4 p-3 bg-gray-100 rounded text-sm overflow-x-auto">
{JSON.stringify(response, null, 2)}
                </pre>
            )}
            {error && (
                <p className="text-red-500 mt-2">{error}</p>
            )}
        </div>
    );
}
