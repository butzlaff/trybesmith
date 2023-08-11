import { ServiceResponse } from '../types/ServiceResponse';
import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';
import { Product } from '../types/Product';

function validateProduct(product: ProductInputtableTypes): boolean {
  if (!product.name || !product.price || !product.orderId) {
    return false;
  }
  return true;
} 

async function createProduct(product: ProductInputtableTypes): 
Promise<ServiceResponse<ProductInputtableTypes>> {
  let response: ServiceResponse<Product>;
  if (!validateProduct(product)) {
    response = { status: 'INVALID_DATA', data: { message: 'Invalid data' } };
  } else {
    const productCreated = await ProductModel.create(product);
    response = { status: 'CREATED', data: productCreated.dataValues };
  }
  return response;
}

export default { createProduct };
