// components/AddOrderDialog.js
import React from "react";
import { Dialog } from "./dialog";

const AddOrderDialog = ({ isOpen, onClose }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");
    onClose(); // Close the dialog after submission
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="bg-white p-6 rounded shadow-lg max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Add New Order</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="order-id"
              className="block text-sm font-medium text-gray-700"
            >
              Order ID
            </label>
            <input
              type="text"
              name="order-id"
              id="order-id"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Order ID"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="customer-name"
              className="block text-sm font-medium text-gray-700"
            >
              Customer Name
            </label>
            <input
              type="text"
              name="customer-name"
              id="customer-name"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Customer Name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="pickup-address"
              className="block text-sm font-medium text-gray-700"
            >
              Pickup Address
            </label>
            <input
              type="text"
              name="pickup-address"
              id="pickup-address"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Pickup Address"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="delivery-address"
              className="block text-sm font-medium text-gray-700"
            >
              Delivery Address
            </label>
            <input
              type="text"
              name="delivery-address"
              id="delivery-address"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Delivery Address"
              required
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Order
          </button>
        </form>
      </div>
    </Dialog>
  );
};

export default AddOrderDialog;
