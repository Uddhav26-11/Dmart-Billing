import { createContext, useContext, useState, useEffect } from "react";
import { calculateBill, ITEM_PRICES } from "../utils/calculations";

const BillingContext = createContext();

const initialState = {
  customer: { name: "", gender: "" },
  items: [
    { name: "Item 1", quantity: 0 },
    { name: "Item 2", quantity: 0 },
    { name: "Item 3", quantity: 0 },
    { name: "Item 4", quantity: 0 },
    { name: "Item 5", quantity: 0 },
    { name: "Item 6", quantity: 0 },
    { name: "Item 7", quantity: 0 },
    { name: "Item 8", quantity: 0 },
    { name: "Item 9", quantity: 0 },
    { name: "Item 10", quantity: 0 },
  ],
  carryBag: false,
  billGenerated: false,
};

export function BillingProvider({ children }) {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem("dmartBilling");
    return saved ? JSON.parse(saved) : initialState;
  });

  useEffect(() => {
    localStorage.setItem("dmartBilling", JSON.stringify(state));
  }, [state]);

  const updateCustomer = (customer) => {
    setState((prev) => ({
      ...prev,
      customer,
    }));
  };

  const updateItemQuantity = (index, quantity) => {
    const newItems = [...state.items];

    newItems[index] = {
      ...newItems[index],
      quantity: Number(quantity),
    };

    setState((prev) => ({
      ...prev,
      items: newItems,
    }));
  };

  const updateCarryBag = (value) => {
    setState((prev) => ({
      ...prev,
      carryBag: value,
    }));
  };

  const generateBill = async () => {
    try {
      const itemsToSave = state.items
        .filter((item) => item.quantity > 0)
        .map((item) => ({
          productName: item.name,
          quantity: item.quantity,
          price: ITEM_PRICES[item.name],
        }));

      const bill = calculateBill(state.items);

      const totalAmount =
        bill.afterGST + (state.carryBag ? 10 : 0);

      const billData = {
        customerName: state.customer.name || "Customer",
        items: itemsToSave,
        totalAmount,
      };

      const response = await fetch(
        "https://dmart-billing-backend.vercel.app/api/bills",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(billData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save bill");
      }

      const data = await response.json();

      console.log("Bill Saved:", data);

      setState((prev) => ({
        ...prev,
        billGenerated: true,
      }));

      alert("✅ Bill Saved Successfully!");
    } catch (error) {
      console.error("Error saving bill:", error);
      alert("❌ Error Saving Bill");
    }
  };

  const resetBilling = () => {
    setState(initialState);
    localStorage.removeItem("dmartBilling");
  };

  return (
    <BillingContext.Provider
      value={{
        state,
        updateCustomer,
        updateItemQuantity,
        updateCarryBag,
        generateBill,
        resetBilling,
      }}
    >
      {children}
    </BillingContext.Provider>
  );
}

export function useBilling() {
  return useContext(BillingContext);
}