import { useEffect, useState } from "react";

export default function BillHistory() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/bills")
      .then((res) => res.json())
      .then((data) => setBills(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          📜 Customer Bills History
        </h1>

        {bills.length === 0 ? (
          <p className="text-center text-gray-500">No Bills Found</p>
        ) : (
          bills.map((bill) => (
            <div
              key={bill._id}
              className="bg-gray-50 border rounded-xl p-3 mb-3 shadow"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold text-gray-800">
                  👤 {bill.customerName}
                </h2>

                <span className="text-lg font-bold text-green-600">
                  ₹{bill.totalAmount}
                </span>
              </div>

              <p className="text-gray-500 mb-2">
                📅 {new Date(bill.date).toLocaleString()}
              </p>

              <details className="mt-2">
                <summary className="cursor-pointer text-blue-600 font-semibold mb-2">
                  📦 View Products
                </summary>

                <table className="w-full border-collapse overflow-hidden rounded-lg mt-2">
                  <thead>
                    <tr className="bg-blue-500 text-white">
                      <th className="p-2">Product</th>
                      <th className="p-2">Qty</th>
                      <th className="p-2">Price</th>
                    </tr>
                  </thead>

                  <tbody>
                    {bill.items.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2">{item.productName}</td>
                        <td className="p-2 text-center">{item.quantity}</td>
                        <td className="p-2 text-center">₹{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </details>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
