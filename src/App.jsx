import { useState } from "react";
import { BillingProvider } from "./context/BillingContext";

import CustomerForm from "./components/CustomerForm";
import ItemEntry from "./components/ItemEntry";
import BillReceipt from "./components/BillReceipt";
import ResetButton from "./components/ResetButton";

import BillHistory from "./pages/BillHistory";
import AdminLogin from "./pages/AdminLogin";

function BillingPage({ onViewHistory }) {
return ( <BillingProvider> <div className="min-h-screen bg-gray-100 py-8 px-4">

```
    <div className="max-w-3xl mx-auto mb-6 text-center">
      <h1 className="text-4xl font-bold text-blue-600">
        🛒 D-Mart Billing System
      </h1>

      <p className="text-gray-500 mt-1">
        Fast & Easy Billing
      </p>

      <button
        onClick={onViewHistory}
        className="mt-4 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
      >
        📜 View Customer Bills History
      </button>
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
const [currentPage, setCurrentPage] = useState("home");
const [isAdmin, setIsAdmin] = useState(false);

if (currentPage === "login") {
return (
<AdminLogin
onLogin={() => {
setIsAdmin(true);
setCurrentPage("history");
}}
/>
);
}

if (currentPage === "history" && isAdmin) {
return ( <div> <div className="bg-white shadow p-4 flex justify-between"> <h1 className="text-2xl font-bold text-blue-600">
Admin Portal </h1>


      <button
        onClick={() => {
          setIsAdmin(false);
          setCurrentPage("home");
        }}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>

    <BillHistory />
  </div>
);


}

return (
<BillingPage
onViewHistory={() => setCurrentPage("login")}
/>
);
}
