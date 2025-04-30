
import { useState } from 'react';
import API from '../api';
import { toast } from 'react-toastify';

export default function TradeForm() {
  const [form, setForm] = useState({ stock_name: '', quantity: '', broker_name: '', price: '', mode: 'FIFO' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/trades', { ...form, quantity: parseInt(form.quantity) });
      setMessage('Trade submitted successfully');
    } catch {
      setMessage('Error submitting trade');
      toast.error("Missing required fields");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Create Trade</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Stock Name" className="w-full p-2 border rounded" onChange={e => setForm({ ...form, stock_name: e.target.value })} />
        <input type="number" placeholder="Quantity (positive=buy, negative=sell)" className="w-full p-2 border rounded" onChange={e => setForm({ ...form, quantity: e.target.value })} />
        <input type="text" placeholder="Broker Name" className="w-full p-2 border rounded" onChange={e => setForm({ ...form, broker_name: e.target.value })} />
        <input type="number" placeholder="Price" className="w-full p-2 border rounded" onChange={e => setForm({ ...form, price: e.target.value })} />
        <select className="w-full p-2 border rounded" onChange={e => setForm({ ...form, mode: e.target.value })}>
          <option value="FIFO">FIFO</option>
          <option value="LIFO">LIFO</option>
        </select>
        <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">Submit</button>
      </form>
      {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
    </div>
  );
}
