import { useEffect, useState } from 'react';
import API from '../api';

export default function TradeList() {
    const [trades, setTrades] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTrades = async () => {
        try {
            const res = await API.get('/trades');
            setTrades(res.data.data || []);
        } catch (err) {
            console.error('Failed to load trades:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrades();
    }, []);

    return (
        <div className="mt-10 bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">All Trades</h2>
            {loading ? (
                <p>Loading trades...</p>
            ) : trades.length === 0 ? (
                <p>No trades found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left border">
                        <thead className="bg-gray-200 text-gray-700 font-semibold">
                            <tr>
                                <th className="p-3 border">Stock</th>
                                <th className="p-3 border">Qty</th>
                                <th className="p-3 border">Price</th>
                                <th className="p-3 border">Amount</th>
                                <th className="p-3 border">Broker</th>
                                <th className="p-3 border">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trades.map((trade) => (
                                <tr key={trade._id} className="hover:bg-gray-50">
                                    <td className="p-2 border">{trade.stock_name}</td>
                                    <td className={`p-2 border ${trade.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {trade.quantity}
                                    </td>
                                    <td className="p-2 border">${trade.price}</td>
                                    <td className="p-2 border">${trade.amount}</td>
                                    <td className="p-2 border">{trade.broker_name}</td>
                                    <td className="p-2 border">{new Date(trade.timestamp).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
