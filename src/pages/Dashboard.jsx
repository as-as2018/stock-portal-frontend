import TradeForm from '../components/TradeForm';
import LotViewer from '../components/LotViewer';
import BulkUpload from '../components/BulkUpload';
import TradeList from '../components/TradeList';

export default function Dashboard() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <TradeForm />
      <BulkUpload />
      <TradeList />
      <LotViewer />
    </div>
  );
}
