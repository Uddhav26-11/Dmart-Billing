import { BillingProvider } from "./context/BillingContext";
import CustomerForm from "./components/CustomerForm";
import ItemEntry from "./components/ItemEntry";
import BillReceipt from "./components/BillReceipt";
import ResetButton from "./components/ResetButton";

export default function App() {
  return (
    <BillingProvider>
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-6 text-center">
          <h1 className="text-4xl font-bold text-blue-600">
            🛒 D-Mart Billing System
          </h1>
          <p className="text-gray-500 mt-1">Fast & Easy Billing</p>
        </div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto">
          <CustomerForm />
          <ItemEntry />
          <BillReceipt />
          <ResetButton />
        </div>

      </div>
    </BillingProvider>
  );
}