
import React, { useState, useEffect } from 'react';
import ProductList from './Components/ProductList';
import SaleSummary from './Components/SaleSummary';
import ReceiptModal from './Components/ReceiptModal';
import './App.css'

const App = () => {
  const [products, setProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [vat, setVat] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [showReceipt, setShowReceipt] = useState(false);
  const [customVat, setCustomVat] = useState(0);
  const [customDiscount, setCustomDiscount] = useState(0);
  const [receiptData, setReceiptData] = useState(null);

  const updateTotals = (items, customVat, customDiscount) => {
    const subTotalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);
    const vatAmount = (subTotalAmount * customVat) / 100;
    const discountAmount = (subTotalAmount * customDiscount) / 100;

    setSubTotal(subTotalAmount);
    setVat(vatAmount);
    setDiscount(discountAmount);
    setTotal(subTotalAmount + vatAmount - discountAmount);
  };
  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
    console.log(products)
  }, []);

  useEffect(() => {
    updateTotals(selectedItems, customVat, customDiscount);
  }, [selectedItems, customVat, customDiscount]);

  const handleProductClick = (product) => {
    const existingItem = selectedItems.find((item) => item.name === product.name);

    if (existingItem) {
      const updatedItems = selectedItems.map((item) =>
        item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
      );
      setSelectedItems(updatedItems);
    } else {
      const newItem = { ...product, quantity: 1 };
      setSelectedItems((prevItems) => [...prevItems, newItem]);
    }
  };

  const handleDelete = (item) => {
    const updatedItems = selectedItems.filter((selectedItem) => selectedItem.name !== item.name);
    setSelectedItems(updatedItems);
  };

  const handleQuantityChange = (item, action) => {
    const updatedItems = selectedItems.map((selectedItem) => {
      if (selectedItem.name === item.name) {
        const newQuantity = action === 'increase' ? selectedItem.quantity + 1 : selectedItem.quantity - 1;
        return { ...selectedItem, quantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return selectedItem;
    });

    setSelectedItems(updatedItems);
  };

  const handleCancelSale = () => {
    setSelectedItems([]);
    setSubTotal(0);
    setVat(0);
    setDiscount(0);
    setTotal(0);
  };

  const handleProcessSale = () => {
    const receiptItems = selectedItems.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      subtotal: item.price * item.quantity,
    }));

    const receiptTotal = total;

    setReceiptData({
      items: receiptItems,
      total: receiptTotal,
      discount:customDiscount,
      vat:customVat
    });
    
    handleCancelSale();
    setShowReceipt(true);
  }

  const handleReceiptClose = () => {
    setShowReceipt(false);
  };

  return (
    <div className="app">
      <ProductList products={products} onProductClick={handleProductClick} />
      <SaleSummary
        items={selectedItems}
        onDelete={handleDelete}
        onQuantityChange={handleQuantityChange}
        subTotal={subTotal}
        vat={customVat}
        discount={customDiscount}
        total={total}
        onVatChange={setCustomVat}
        onDiscountChange={setCustomDiscount}
      />
      <div className="buttons">
        <button className='cancel' onClick={handleCancelSale}>CANCEL SALE</button>
        <button className='process' onClick={handleProcessSale}>PROCESS SALE</button>
      </div>
      {showReceipt && <ReceiptModal onClose={() => setShowReceipt(false)} receiptData={receiptData} />}
    </div>
  );
};

export default App;
