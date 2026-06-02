import { useBilling } from "../context/BillingContext";
import { calculateBill, calculateItemTotal, getItemDiscount, ITEM_PRICES } from "../utils/calculations";

export default function BillReceipt() {
  const { state, updateCarryBag, generateBill } = useBilling();
  const { customer, items, carryBag, billGenerated } = state;

  // Bill calculate karo
  const bill = calculateBill(items);
  const finalAmount = bill.afterGST + (carryBag ? 10 : 0);

  // Gift based on gender
  const gift = customer.gender === "Female" ? "🍫 Cadbury Chocolate" : "👜 Leather Wallet";

  if (!billGenerated) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-blue-600 mb-4">
          🧾 Generate Bill
        </h2>

        {/* Carry Bag */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Do you need a Carry Bag? (+₹10)
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => updateCarryBag(true)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                carryBag
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => updateCarryBag(false)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                !carryBag
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              No
            </button>
          </div>
        </div>

        {/* Generate Bill Button */}
        <button
          onClick={generateBill}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-semibold"
        >
          Generate Bill 🧾
        </button>
      </div>
    );
  }

  // Bill Receipt
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-2">
        🛒 D-Mart
      </h2>
      <p className="text-center text-gray-500 mb-4 text-sm">
        Thank you for shopping!
      </p>

      {/* Customer Info */}
      <div className="bg-blue-50 rounded-lg p-3 mb-4">
        <p><span className="font-semibold">Name:</span> {customer.name}</p>
        <p><span className="font-semibold">Gender:</span> {customer.gender}</p>
      </div>

      {/* Items Table */}
      <table className="w-full text-sm mb-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-2 text-left">Item</th>
            <th className="px-3 py-2 text-right">Qty</th>
            <th className="px-3 py-2 text-right">Price</th>
            <th className="px-3 py-2 text-right">Disc</th>
            <th className="px-3 py-2 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            const price = ITEM_PRICES[item.name];
            const discount = getItemDiscount(item.name, item.quantity);
            const total = calculateItemTotal(item.name, item.quantity);
            if (item.quantity === 0) return null;
            return (
              <tr key={index} className="border-b">
                <td className="px-3 py-2">{item.name}</td>
                <td className="px-3 py-2 text-right">{item.quantity}</td>
                <td className="px-3 py-2 text-right">₹{price}</td>
                <td className="px-3 py-2 text-right text-green-600">
                  {discount > 0 ? `${discount}%` : "—"}
                </td>
                <td className="px-3 py-2 text-right">₹{total.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Bill Summary */}
      <div className="border-t pt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{bill.subtotal.toFixed(2)}</span>
        </div>
        {bill.billDiscount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Bill Discount ({bill.billDiscount}%)</span>
            <span>- ₹{bill.billDiscountAmount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>GST (10%)</span>
          <span>₹{bill.gst.toFixed(2)}</span>
        </div>
        {carryBag && (
          <div className="flex justify-between">
            <span>Carry Bag</span>
            <span>₹10.00</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-lg border-t pt-2">
          <span>Total Amount</span>
          <span>₹{finalAmount.toFixed(2)}</span>
        </div>
      </div>

      {/* Gift */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4 text-center">
        <p className="font-semibold text-yellow-700">🎁 Free Gift for you!</p>
        <p className="text-lg">{gift}</p>
      </div>
    </div>
  );
}