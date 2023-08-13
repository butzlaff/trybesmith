import { ServiceResponse } from '../types/ServiceResponse';
import ProductModel, { ProductInputtableTypes, 
  ProductSequelizeModel } from '../database/models/product.model';
import { Product } from '../types/Product';

function validateProduct(product: ProductInputtableTypes): false | string {
  if (!product.name) {
    return 'Invalid name';
  } if (!product.price) {
    return 'Invalid price';
  } if (!product.orderId) {
    return 'Invalid orderId';
  }
  return false;
} 

async function createProduct(product: ProductInputtableTypes): 
Promise<ServiceResponse<ProductInputtableTypes>> {
  let response: ServiceResponse<Product>;
  const error = validateProduct(product);
  if (error) {
    response = { status: 'INVALID_DATA', data: { message: error } };
  } else {
    const { dataValues } = await ProductModel.create(product);
    response = { status: 'CREATED', data: dataValues };
  }
  return response;
}

async function listAll(): Promise<ServiceResponse<ProductSequelizeModel[]>> {
  const products = await ProductModel.findAll();
  return { status: 'SUCCESSFUL', data: products };
}

export default { createProduct, listAll };
