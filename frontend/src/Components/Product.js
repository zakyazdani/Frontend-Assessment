import '../Css/Product.css'

const Product = ({ product, onClick }) => {
    return (
      <div className="product" onClick={onClick}>
        <img src={product.image} alt={product.name} />
        <p>{product.name}</p>
        <div className="tooltip">
        <p>Price: {product.price}</p>
        <p>Description: {product.description}</p>
      </div>
      </div>
    );
  };
  
  export default Product;
  