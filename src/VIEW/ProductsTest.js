import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProductsTest() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // Función para obtener los productos desde el web service
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost/webservSCI/getProducts.php');
      console.log(response.data); // Imprime los datos para verificar qué campos se están recibiendo
      setProducts(response.data); // Guarda los productos en el estado
    } catch (error) {
      setError('Error al obtener productos');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Lista de Productos</h1>
      {error && <p>{error}</p>}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {/* Muestra los campos que tienes disponibles en cada objeto */}
            Nombre: {product.NAME || product.name} - Precio: ${product.price} - Stock: {product.stock}
          </li>
        ))}
      </ul>
    </div>
  );
}
