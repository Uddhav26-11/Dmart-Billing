import { useState } from "react";
import toast from "react-hot-toast";
import { useBilling } from "../context/BillingContext";

export default function CustomerForm() {
  const { state, updateCustomer } = useBilling();
  const [name, setName] = useState(state.customer.name);
  const [gender, setGender] = useState(state.customer.gender);

  const handleSubmit = () => {
    if (!name || !gender) {
      toast.error("Please enter name and gender!");
      return;
    }

    updateCustomer({ name, gender });
    toast.success("Customer details saved!");
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-blue-600 mb-4">
        👤 Customer Details
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Customer Name
        </label>

        <input
          type="text"
          placeholder="Enter name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Gender
        </label>

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">-- Select Gender --</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
      >
        Save Details
      </button>
    </div>
  );
}