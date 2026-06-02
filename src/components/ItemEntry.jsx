import { useBilling } from "../context/BillingContext";
import { ITEM_PRICES, getItemDiscount, calculateItemTotal } from "../utils/calculations";

export default function ItemEntry() {
  const { state, updateItemQuantity } = useBilling();

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-blue-600 mb-4">
        🛒 Items
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          {/* Table Header */}
          <thead className="bg-blue-50 text-blue-700">
            <tr>
              <th className="px-4 py-2">Item</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Discount</th>
              <th className="px-4 py-2">Total</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {state.items.map((item, index) => {
              const price = ITEM_PRICES[item.name];
              const discount = getItemDiscount(item.name, item.quantity);
              const total = calculateItemTotal(item.name, item.quantity);

              return (
                <tr key={index} className="border-b hover:bg-gray-50">
                  {/* Item Name */}
                  <td className="px-4 py-2 font-semibold">{item.name}</td>

                  {/* Price */}
                  <td className="px-4 py-2">₹{price}</td>

                  {/* Quantity Input */}
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      min="0"
                      value={item.quantity}
                      onChange={(e) => updateItemQuantity(index, e.target.value)}
                      className="w-20 border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </td>

                  {/* Discount Badge */}
                  <td className="px-4 py-2">
                    {discount > 0 ? (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                        {discount}% off
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>

                  {/* Total */}
                  <td className="px-4 py-2 font-semibold text-gray-700">
                    ₹{total.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}