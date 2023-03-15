// @ts-nocheck
import { useMutation, useQuery } from 'react-query';
// import { getProduct, getProducts, createProduct, updateProduct, deleteProduct } from './products';
import { getProduct, getProducts, createProduct, updateProduct, deleteProduct } from './products.fixture';

// eslint-disable-next-line
const useGetProduct = (ProductId) => {
  return useQuery({
    queryKey: ['product'],
    queryFn: () => {
      return getProduct(ProductId);
    },
  });
};

// eslint-disable-next-line
const useGetProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => {
      return getProducts();
    },
  });
};

// eslint-disable-next-line
const useCreateProduct = (data) => {
  return useMutation({
    mutationFn: (data) => {
      return createProduct(data);
    },
  });
};

// eslint-disable-next-line
const useUpdateProduct = (data) => {
  return useMutation({
    mutationFn: (data) => {
      return updateProduct(data);
    },
  });
};

// eslint-disable-next-line
const useDeleteProduct = (ProductId) => {
  return useMutation({
    mutationFn: (ProductId) => {
      return deleteProduct(ProductId);
    },
  });
};

export { useGetProduct, useGetProducts, useCreateProduct, useUpdateProduct, useDeleteProduct };
