import { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = 'http://localhost:5050/api';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all products
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
      return data;
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch single product
  const fetchProduct = useCallback(async (id) => {
    if (!id) return { success: false, error: 'No product ID provided' };
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      const data = await response.json();
      if (data.success) {
        setProduct(data.data);
      }
      return data;
    } catch (err) {
      console.error('Error fetching product:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Search users
  const searchUsers = useCallback(async (searchTerm) => {
    if (!searchTerm) return { success: false, error: 'No search term provided' };
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/users?search=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Error searching users:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    products,
    product,
    loading,
    error,
    fetchProducts,
    fetchProduct,
    searchUsers,
  };
};

export default useProducts;
