// PopupCard.js
import React from "react";
import { Dialog } from "shadcn-ui"; // Assuming Dialog is the modal component from Shadcn UI

const PopupCard = ({ title, subtitle, buttonText, onSubmit }) => {
  return (
    <Dialog isOpen={true} onClose={() => {}}>
      <div className="bg-white p-6 rounded shadow-lg max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="text-gray-600 mb-4">{subtitle}</p>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Input Field 1"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Input Field 2"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          onClick={onSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {buttonText}
        </button>
      </div>
    </Dialog>
  );
};

export default PopupCard;
