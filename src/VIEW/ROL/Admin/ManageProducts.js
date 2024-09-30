import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Container, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faEdit, faTrash, faShoppingCart, faBoxes } from '@fortawesome/free-solid-svg-icons';
import Header from '../../HEAD/AdminHeader'; // Importamos el header personalizado

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSelling, setIsSelling] = useState(false);
  const [isAddingStock, setIsAddingStock] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productData, setProductData] = useState({
    name: '',
    price: 0,
    stock: 0,
  });
  const [saleQuantity, setSaleQuantity] = useState(0);
  const [addStockQuantity, setAddStockQuantity] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost/webservSCI/getProducts.php');
        setProducts(response.data);
      } catch (error) {
        toast.error('Error al cargar los productos');
      }
    };
    fetchProducts();
  }, []);

  const handleShow = (product = null) => {
    if (product) {
      setIsEditing(true);
      setSelectedProduct(product);
      setProductData({
        name: product.name,
        price: product.price,
        stock: product.stock,
      });
    } else {
      setIsEditing(false);
      setSelectedProduct(null);
      setProductData({ name: '', price: 0, stock: 0 });
    }
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const user_id = 1;

      if (isEditing) {
        await axios.post('http://localhost/webservSCI/editProduct.php', {
          id: selectedProduct.id,
          name: productData.name,
          price: productData.price,
          user_id: user_id,
        });
        toast.success('Producto editado correctamente');
      } else {
        await axios.post('http://localhost/webservSCI/manageProducts.php', {
          ...productData,
          user_id: user_id,
        });
        toast.success('Producto agregado correctamente');
      }

      const response = await axios.get('http://localhost/webservSCI/getProducts.php');
      setProducts(response.data);
      handleClose();
    } catch (error) {
      toast.error('Error al gestionar el producto');
    }
  };

  const handleDelete = async () => {
    try {
      const user_id = 1;
      await axios.post('http://localhost/webservSCI/deleteProduct.php', { id: selectedProduct.id, user_id: user_id });
      toast.success('Producto eliminado correctamente');

      const response = await axios.get('http://localhost/webservSCI/getProducts.php');
      setProducts(response.data);
      handleCloseDeleteModal();
    } catch (error) {
      toast.error('Error al eliminar el producto');
    }
  };

  const handleSell = async () => {
    try {
      const updatedStock = selectedProduct.stock - saleQuantity;

      if (updatedStock < 0) {
        toast.error('Cantidad insuficiente en stock');
        return;
      }

      await axios.post('http://localhost/webservSCI/sellProduct.php', {
        id: selectedProduct.id,
        newStock: updatedStock,
        soldQuantity: saleQuantity,
        user_id: 1,
      });
      toast.success(`Producto vendido: ${saleQuantity} unidades`);

      const response = await axios.get('http://localhost/webservSCI/getProducts.php');
      setProducts(response.data);
      setIsSelling(false);
    } catch (error) {
      toast.error('Error al realizar la venta');
    }
  };

  const handleAddStock = async () => {
    try {
      const updatedStock = selectedProduct.stock + addStockQuantity;

      await axios.post('http://localhost/webservSCI/addStock.php', {
        id: selectedProduct.id,
        newStock: updatedStock,
        quantity: addStockQuantity,
        user_id: 1,
      });
      toast.success(`Stock actualizado: +${addStockQuantity} unidades`);

      const response = await axios.get('http://localhost/webservSCI/getProducts.php');
      setProducts(response.data);
      setIsAddingStock(false);
    } catch (error) {
      toast.error('Error al agregar stock');
    }
  };

  const handleShowSellModal = (product) => {
    setSelectedProduct(product);
    setSaleQuantity(0);
    setIsSelling(true);
  };

  const handleShowAddStockModal = (product) => {
    setSelectedProduct(product);
    setAddStockQuantity(0);
    setIsAddingStock(true);
  };

  const handleShowDeleteModal = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <Header />
      <Container className="mt-5">
        <ToastContainer />
        <h2 className="mb-4 text-center text-primary">Gestión de Productos</h2>

        {/* Buscador */}
        <InputGroup className="mb-4">
          <InputGroup.Text id="basic-addon1">
            <FontAwesomeIcon icon={faSearch} />
          </InputGroup.Text>
          <FormControl
            placeholder="Buscar producto por nombre"
            aria-label="Buscar"
            aria-describedby="basic-addon1"
            onChange={handleSearch}
            value={searchTerm}
          />
        </InputGroup>

        <Button variant="primary" className="mb-3" onClick={() => handleShow()}>
          <FontAwesomeIcon icon={faPlus} /> Agregar Producto
        </Button>

        <Table responsive="sm" striped bordered hover className="text-center">
          <thead className="table-dark">
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : 'Sin precio'}</td>
                  <td>{product.stock}</td>
                  <td>
                    <div className="d-flex justify-content-around">
                      {/* Botones con iconos para pantallas grandes */}
                      <Button
                        variant="warning"
                        className="me-2 d-lg-block d-none"
                        onClick={() => handleShow(product)}
                      >
                        <FontAwesomeIcon icon={faEdit} /> Editar
                      </Button>
                      <Button
                        variant="success"
                        className="me-2 d-lg-block d-none"
                        onClick={() => handleShowSellModal(product)}
                      >
                        <FontAwesomeIcon icon={faShoppingCart} /> Venta
                      </Button>
                      <Button
                        variant="info"
                        className="me-2 d-lg-block d-none"
                        onClick={() => handleShowAddStockModal(product)}
                      >
                        <FontAwesomeIcon icon={faBoxes} /> Agregar Stock
                      </Button>
                      <Button
                        variant="danger"
                        className="me-2 d-lg-block d-none"
                        onClick={() => handleShowDeleteModal(product)}
                      >
                        <FontAwesomeIcon icon={faTrash} /> Eliminar
                      </Button>

                      {/* 2x2 grid de iconos para pantallas pequeñas */}
                      <div className="d-lg-none d-flex flex-wrap">
                        <div className="d-flex w-50 justify-content-center p-2">
                          <Button variant="warning" onClick={() => handleShow(product)}>
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                        </div>
                        <div className="d-flex w-50 justify-content-center p-2">
                          <Button variant="success" onClick={() => handleShowSellModal(product)}>
                            <FontAwesomeIcon icon={faShoppingCart} />
                          </Button>
                        </div>
                        <div className="d-flex w-50 justify-content-center p-2">
                          <Button variant="info" onClick={() => handleShowAddStockModal(product)}>
                            <FontAwesomeIcon icon={faBoxes} />
                          </Button>
                        </div>
                        <div className="d-flex w-50 justify-content-center p-2">
                          <Button variant="danger" onClick={() => handleShowDeleteModal(product)}>
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No se encontraron productos</td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* Modal para agregar o editar producto */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{isEditing ? 'Editar Producto' : 'Agregar Producto'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nombre o Código de Identificación</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={productData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={productData.price}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              {!isEditing && (
                <Form.Group className="mb-3">
                  <Form.Label>Stock Inicial</Form.Label>
                  <Form.Control
                    type="number"
                    name="stock"
                    value={productData.stock}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSave}>
              {isEditing ? 'Guardar Cambios' : 'Guardar'}
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal de confirmación de eliminación */}
        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Eliminar Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>¿Estás seguro de que quieres eliminar el producto "{selectedProduct?.name}"?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeleteModal}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal de confirmación de venta */}
        <Modal show={isSelling} onHide={() => setIsSelling(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Venta de Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Cantidad a Vender</Form.Label>
              <Form.Control
                type="number"
                value={saleQuantity}
                onChange={(e) => setSaleQuantity(parseInt(e.target.value))}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsSelling(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSell}>
              Realizar Venta
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal de agregar stock */}
        <Modal show={isAddingStock} onHide={() => setIsAddingStock(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar Stock</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Cantidad a Agregar</Form.Label>
              <Form.Control
                type="number"
                value={addStockQuantity}
                onChange={(e) => setAddStockQuantity(parseInt(e.target.value))}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsAddingStock(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleAddStock}>
              Agregar Stock
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}
