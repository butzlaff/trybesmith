import { ServiceResponse } from '../types/ServiceResponse';
import ProductModel, { ProductInputtableTypes, 
  ProductSequelizeModel } from '../database/models/product.model';
import validateDataName, { ResponseJoi } from '../utils/validations/validateNamePrice';

function validateProduct(product: ProductInputtableTypes): false | ResponseJoi {
  const error = validateDataName(product);
  return error;
} 

async function createProduct(product: ProductInputtableTypes): 
Promise<ServiceResponse<ProductInputtableTypes>> {
  const { name, price, orderId } = product;
  const error = validateProduct({ name, price, orderId });
  if (error) {
    return { status: error.status, data: { message: error.message } };
  }
  // const { name, price, orderId = 0 } = product;
  const { dataValues } = await ProductModel.create({ name, price, orderId });
  return { status: 'CREATED', data: dataValues };
}

async function listAll(): Promise<ServiceResponse<ProductSequelizeModel[]>> {
  const products = await ProductModel.findAll();
  return { status: 'SUCCESSFUL', data: products };
}

export default { createProduct, listAll };
