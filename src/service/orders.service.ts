import OrderModel, { OrderSequelizeModel } from '../database/models/order.model';
import { ServiceResponse } from '../types/ServiceResponse';
import ProductModel from '../database/models/product.model';
import sequelize from '../database/models/index';

async function listAll(): Promise<ServiceResponse<OrderSequelizeModel[]>> {
  const orders = await OrderModel.findAll({
    include: [
      { model: ProductModel, as: 'productIds', attributes: [] },
    ],
    attributes: [
      'id', 
      'userId',
      // https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html#function_json-arrayagg
      // https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#advanced-queries-with-functions-not-just-columns
      [sequelize.fn('JSON_ARRAYAGG', sequelize.col('productIds.id')), 'productIds'],
    ],
    raw: true,
    group: ['Order.id'],
    nest: true,
  });

  return { status: 'SUCCESSFUL', data: orders };
}

export default { listAll };