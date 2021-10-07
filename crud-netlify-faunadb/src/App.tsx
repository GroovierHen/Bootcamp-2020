import React, { useState, useCallback } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const initialProducts: Product[] = [
  {
    id: Math.random(),
    name: 'Phone',
    price: 1000,
    quantity: 5,
  },
  {
    id: Math.random(),
    name: 'Laptop',
    price: 2000,
    quantity: 3,
  },
];

const App = () => {
  const [update, setUpdate] = useState(false);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [product, setProduct] = useState<Product>({
    id: Math.random(),
    name: '',
    price: 0,
    quantity: 0,
  });

  const handleOnchange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setProduct((prevState) => ({
        ...prevState,
        [evt.target.name]: evt.target.value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault();

      if (update) {
        setProducts((prevState) => {
          prevState[prevState.findIndex((p) => p.id === product.id)] = product;

          return [...prevState];
        });
      } else {
        setProducts((prevState) => [
          ...prevState,
          { ...product, id: Math.random() },
        ]);
      }
    },
    [product, update]
  );

  const handleUpdate = useCallback(
    (id: number) => () => {
      setUpdate(true);
      setProduct(products.find((p) => p.id === id)!);
    },
    [products]
  );

  const handleDelete = useCallback(
    (id: number) => () => {
      setProducts((prevState) => prevState.filter((p) => p.id !== id));
    },
    []
  );

  return (
    <>
      <header>
        <div className="container">
          <h1>CRUD APP</h1>
        </div>
      </header>
      <form onSubmit={handleSubmit}>
        <h2>Create a Product</h2>
        <label htmlFor="product-name">Product Name</label>
        <input
          id="product-name"
          name="name"
          value={product.name}
          onChange={handleOnchange}
        />
        <label htmlFor="product-price">Product Price</label>
        <input
          id="product-price"
          name="price"
          type="number"
          value={product.price}
          onChange={handleOnchange}
        />
        <label htmlFor="product-quantity">Product Quantity</label>
        <input
          id="product-quantity"
          name="quantity"
          type="number"
          value={product.quantity}
          onChange={handleOnchange}
        />
        <button type="submit">{update ? 'Update' : 'Create'}</button>
      </form>
      <div className="container">
        {products.map((product) => (
          <div key={product.id} className="product-container">
            <ul className="product-info">
              <li>
                <span>id:</span>
                <span>{product.id}</span>
              </li>
              <li>
                <span> Name:</span>
                <span>{product.name}</span>
              </li>
              <li>
                <span> Price:</span>
                <span>{product.price}</span>
              </li>
              <li>
                <span> Quantity:</span>
                <span>{product.quantity}</span>
              </li>
            </ul>
            <div className="product-action">
              <button onClick={handleUpdate(product.id)}>Update</button>
              <button onClick={handleDelete(product.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
