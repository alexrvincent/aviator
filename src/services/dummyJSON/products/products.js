// @ts-nocheck
import axios from 'axios';
import { baseUrls } from '..';

/* GET */
// eslint-disable-next-line
const getProduct = async ({ id }) => {
  const { data } = await axios.get(`${baseUrls.dev}/products/${id}`);
  return data;
};
// eslint-disable-next-line
const getProducts = async () => {
  // const { data } = await axios.get(`${baseUrls.dev}/products`);
  const { data } = await axios.get(`${baseUrls.dev}/products`);
  return data.products;
};

/* POST */
// eslint-disable-next-line
const createProduct = async ({ body }) => {
  const { data } = await axios.post(`${baseUrls.dev}/products`);
  return data;
};

/* PUT */
// eslint-disable-next-line
const updateProduct = async ({ body }) => {
  const { data } = await axios.put(`${baseUrls.dev}/products`);
  return data;
};

/* DELETE */
// eslint-disable-next-line
const deleteProduct = async () => {
  const { data } = await axios.delete(`${baseUrls.dev}/products`);
  return data;
};

export { getProduct, getProducts, createProduct, updateProduct, deleteProduct };
