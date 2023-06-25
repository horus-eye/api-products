import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [editingProductId, setEditingProductId] = useState(null);
    const [editedProduct, setEditedProduct] = useState({});
    const [newProduct, setNewProduct] = useState({
        title: '',
        description: '',
        price: '',
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        fetchProducts();
    }, [editingProductId]);

    // Fetch products from the server
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/products');
            const sortedProducts = [...response.data].reverse();
            setProducts(sortedProducts);
        } catch (error) {
            console.error(error);
        }
    };

    // Delete a product
    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/products/${id}`);
            setEditingProductId(null);
            fetchProducts();
        } catch (error) {
            console.error(error);
        }
    };

    // Edit a product
    const editProduct = (id) => {
        const product = products.find((p) => p._id === id);
        setEditingProductId(id);
        setEditedProduct(product);
    };

    // Cancel editing a product
    const cancelEdit = () => {
        setEditingProductId(null);
        setEditedProduct({});
    };

    // Save an edited product
    const saveProduct = async (id) => {
        try {
            await axios.put(`http://localhost:3000/api/products/${id}`, editedProduct);
            setEditingProductId(null);
            setEditedProduct({});
            fetchProducts();
        } catch (error) {
            console.error(error);
        }
    };

    // Handle input change for edited product
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    // Add a new product
    const addProduct = async () => {
        try {
            await axios.post('http://localhost:3000/api/products', newProduct);
            setNewProduct({
                title: '',
                description: '',
                price: '',
            });
            fetchProducts();
        } catch (error) {
            console.error(error);
        }
    };

    // Handle input change for new product
    const handleNewProductChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    // Handle search term change
    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Handle sort order change
    const handleSortOrderChange = (e) => {
        setSortOrder(e.target.value);
    };

    // Filter and sort products
    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.price.toString().includes(searchTerm)
    );

    const sortedProducts = filteredProducts.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.price - b.price;
        } else if (sortOrder === 'desc') {
            return b.price - a.price;
        }
        return 0;
    });

    return (
        <div className="container">
            <div className="mb-3">
                <h2 className='text-center text-muted mt-2'>PRODUCTS</h2>
                <h3 className='mt-5 mb-4'>Add Product</h3>
                <div className="form-row">
                    <div className="col-12 col-sm-3 mb-2">
                        <input
                            className="form-control"
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={newProduct.title}
                            onChange={handleNewProductChange}
                        />
                    </div>
                    <div className="col-12 col-sm-3 mb-2">
                        <input
                            className="form-control"
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={newProduct.description}
                            onChange={handleNewProductChange}
                        />
                    </div>
                    <div className="col-12 col-sm-3 mb-2">
                        <input
                            className="form-control"
                            type="text"
                            name="price"
                            placeholder="$0.00"
                            value={newProduct.price}
                            onChange={handleNewProductChange}
                        />
                    </div>
                    <div className="col-12 col-sm-3 mb-2">
                        <button className="btn btn-success btn-block" onClick={addProduct}>
                            <strong> + Product</strong>
                        </button>
                    </div>
                </div>
            </div>

            <div className="mb-3">
                <h3>Filter and Sort</h3>
                <div className="form-row">
                    <div className="col-12 col-sm-6 mb-2">
                        <input
                            className="form-control"
                            type="text"
                            name="searchTerm"
                            placeholder="Search by title or price"
                            value={searchTerm}
                            onChange={handleSearchTermChange}
                        />
                    </div>
                    <div className="col-12 col-sm-6 mb-2">
                        <select
                            className="form-control"
                            name="sortOrder"
                            value={sortOrder}
                            onChange={handleSortOrderChange}
                        >
                            <option value="asc">Sort by Price (Low to High)</option>
                            <option value="desc">Sort by Price (High to Low)</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <table className=" table table-striped table-table-responsive-sm">
                        <thead >
                            <tr>
                                <th className='text-start'>Title</th>
                                <th className='text-start'>Description</th>
                                <th className='text-start'>Price</th>
                                <th className='text-center'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedProducts.map((product) => (
                                <tr key={product._id}>
                                    {editingProductId === product._id ? (
                                        <>
                                            <td>
                                                <input
                                                    className="form-control "
                                                    type="text"
                                                    name="title"
                                                    value={editedProduct.title || ''}
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="description"
                                                    value={editedProduct.description || ''}
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    className="form-control "
                                                    type="text"
                                                    name="price"
                                                    value={editedProduct.price || ''}
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                            <td>
                                                <button className="btn btn-primary w-100" onClick={() => saveProduct(product._id)}>
                                                    Save
                                                </button>
                                                <button className="btn btn-secondary w-100 mt-2" onClick={cancelEdit}>
                                                    Cancel
                                                </button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{product.title}</td>
                                            <td>{product.description}</td>
                                            <td>{product.price}</td>
                                            <td>
                                                <button className="btn btn-primary w-100" onClick={() => editProduct(product._id)}>
                                                    Edit
                                                </button>
                                                <button className="btn btn-danger w-100 mt-2" onClick={() => deleteProduct(product._id)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className=" m-4 mb-2 mx-auto d-flex justify-content-center">
                <a className=" btn btn-primary " href="http://localhost:3001/api/">Logout</a>
            </div>
        </div>
    );
};

export default ProductTable;
