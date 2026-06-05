import { Routes, Route, Link } from "react-router-dom";

import { BillingProvider } from "./context/BillingContext";
import CustomerForm from "./components/CustomerForm";
import ItemEntry from "./components/ItemEntry";
import BillReceipt from "./components/BillReceipt";
import ResetButton from "./components/ResetButton";

import BillHistory from "./pages/BillHistory";

function HomePage() {
return ( <BillingProvider> <div className="min-h-screen bg-gray-100 py-8 px-4">

```
    <div className="max-w-3xl mx-auto mb-6 text-center">
      <h1 className="text-4xl font-bold text-blue-600">
        🛒 D-Mart Billing System
      </h1>

      <p className="text-gray-500 mt-1">
        Fast & Easy Billing
      </p>

      <Link
        to="/history"
        className="inline-block mt-4 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
      >
        📜 View Customer Bills History
      </Link>
    </div>

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

export default function App() {
return ( <Routes>
<Route path="/" element={<HomePage />} />
<Route path="/history" element={<BillHistory />} /> </Routes>
);
}
