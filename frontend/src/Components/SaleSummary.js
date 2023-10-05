import React from 'react';
import '../Css/SaleSummary.css';

const SaleSummary = ({ items, onDelete, onQuantityChange, subTotal, vat, discount, total, onVatChange, onDiscountChange }) => {
  return (
    <div className="sale-summary">
      <div className="header">
    <div className="header-section">Product</div>
    <div className="header-section">Price</div>
    <div className="header-section">Quantity</div>
    <div className="header-section">Total</div>
  </div>
      {items.length === 0 ? (
        <h4 className='no-item'>There are no products</h4>
      ) : (
        items.map((item) => (
          <div key={item.name} className="summary-item">
          <button className='cross-button' onClick={() => onDelete(item)} >X</button>
        <p className='item-name'>{item.name}</p>
        <p className='price'>{item.price}</p>
        <button className="decrease" onClick={() => onQuantityChange(item, 'decrease')}>-</button>
        <p>{item.quantity}</p>
        <button onClick={() => onQuantityChange(item, 'increase')}>+</button>
        <p className='item-total'>{item.price * item.quantity}EUR</p>
      </div>
        ))
      )}
      <div className="summary-totals">
        <span className='span-1'>Sub Total:</span><span className="sub-total">{subTotal}</span>
        <p>
          VAT: 
          <input type="number" value={vat} className='input-vat' onChange={(e) => onVatChange(parseFloat(e.target.value))} />%
        </p>
        <p>
          Discount: 
          <input type="number" value={discount} className='input-discount' onChange={(e) => onDiscountChange(parseFloat(e.target.value))} />%
        </p>
        <span className='span-2'>Total:</span><span className='total'>{total}</span>
      </div>
    </div>
  );
};

export default SaleSummary;
