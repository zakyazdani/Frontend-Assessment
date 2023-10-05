import React from 'react';
import '../Css/ReceiptModal.css';

const ReceiptModal = ({ onClose, receiptData }) => {
  if (!receiptData) {
    return null;
  }

  const { items, total, discount, vat } = receiptData;

  const saleNumber = Math.floor(1000 + Math.random() * 9000);
  const currentDate = new Date().toLocaleString();

  return (
    <div>
      <div className="backdrop" onClick={onClose}></div>
      <div className="receipt-modal">
        <div className="modal-header">
          <h2>Receipt</h2>
          <p>Sale Number: {saleNumber}</p>
          <p>Date:{currentDate}</p>
        </div>
        <div className="modal-body">
          <div className="receipt-header">
            <span>Product</span>
            <span>Quantity</span>
            <span>Subtotal</span>
          </div>
          {items.map((item, index) => (
            <div key={item.name} className="receipt-item">
              <span>{item.name}</span>
              <span>{item.quantity}</span>
              <span>{item.subtotal.toFixed(2)}EUR</span>
            </div>
          ))}
        </div>
        <div className="modal-footer">
          <div className="total-items">
            <span>Total Items:</span>
            <span>{items.length}</span>
          </div>
          <div className="total-price">
            <span>Total Price:</span>
            <span>{total.toFixed(2)}EUR</span>
          </div>
        </div>
        <div className='modal-footer-2'>
          <div className="discount">
            <span>Discount:</span>
            <span>{discount.toFixed(2)}%</span>
          </div>
          <div className="vat">
            <span>VAT:</span>
            <span>{vat.toFixed(2)}%</span>
          </div>
        </div>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ReceiptModal;