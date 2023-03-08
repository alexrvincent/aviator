/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* GET */
// eslint-disable-next-line
import { mockAxiosResponse } from 'utils/axios';

const getProduct = async () => {
  return mockAxiosResponse({
    status: 200,
    waitTime: 100,
    data: {
      id: 1,
      title: 'iPhone 9',
      description: 'An apple mobile which is nothing like apple',
      price: 549,
      discountPercentage: 12.96,
      rating: 4.69,
      stock: 94,
      brand: 'Apple',
      category: 'smartphones',
      thumbnail: '...',
      images: ['...', '...', '...'],
    },
  });
};

const getProducts = async () => {
  return mockAxiosResponse({
    status: 200,
    waitTime: 100,
    data: [
      {
        id: 1,
        title: 'iPhone 9',
        description: 'An apple mobile which is nothing like apple',
        price: 549,
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        brand: 'Apple',
        category: 'smartphones',
      },
      {
        id: 2,
        title: 'iPhone 10',
        description: 'An apple mobile which is nothing like apple',
        price: 559,
        discountPercentage: 20.96,
        rating: 1.69,
        stock: 34,
        brand: 'Apple',
        category: 'smartphones',
      },
    ],
  });
};
const createProduct = async () => {
  return mockAxiosResponse({
    status: 200,
    waitTime: 100,
    data: {
      id: 1,
      title: 'iPhone 9',
      description: 'An apple mobile which is nothing like apple',
      price: 549,
      discountPercentage: 12.96,
      rating: 4.69,
      stock: 94,
      brand: 'Apple',
      category: 'smartphones',
    },
  });
};
const updateProduct = async () => {
  return mockAxiosResponse({
    status: 200,
    waitTime: 100,
    data: {
      id: 1,
      title: 'iPhone 9',
      description: 'An apple mobile which is nothing like apple',
      price: 549,
      discountPercentage: 12.96,
      rating: 4.69,
      stock: 94,
      brand: 'Apple',
      category: 'smartphones',
    },
  });
};

const deleteProduct = async () => {
  return mockAxiosResponse({
    status: 200,
    waitTime: 100,
    data: {},
  });
};

export { getProduct, getProducts, createProduct, updateProduct, deleteProduct };
