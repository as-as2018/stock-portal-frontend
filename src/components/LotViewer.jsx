
import { useEffect, useState } from 'react';
import API from '../api';

export default function LotViewer() {
  const [fifoLots, setFifoLots] = useState([]);
  const [lifoLots, setLifoLots] = useState([]);

  useEffect(() => {
    const fetchLots = async () => {
      const fifo = await API.get('/lots/fifo');
      const lifo = await API.get('/lots/lifo');
      setFifoLots(fifo.data.data);
      setLifoLots(lifo.data.data);
    };
    fetchLots();
  }, []);

  const renderLots = (lots) => (
    <table className="w-full border text-sm">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2 border">Stock</th>
          <th className="p-2 border">Lot Qty</th>
          <th className="p-2 border">Realized</th>
          <th className="p-2 border">Status</th>
        </tr>
      </thead>
      <tbody>
        {lots.map((lot, idx) => (
          <tr key={idx} className="text-center">
            <td className="border p-1">{lot.stock_name}</td>
            <td className="border p-1">{lot.lot_quantity}</td>
            <td className="border p-1">{lot.realized_quantity}</td>
            <td className="border p-1">{lot.lot_status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="mt-8 space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-2">FIFO Lots</h2>
        {renderLots(fifoLots)}
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">LIFO Lots</h2>
        {renderLots(lifoLots)}
      </div>
    </div>
  );
}