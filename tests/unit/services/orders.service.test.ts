import { expect } from 'chai';
import sinon from 'sinon';
import OrderService from '../../../src/service/orders.service';
import OrderModel from '../../../src/database/models/order.model';

describe('Test the OrderService', function () {
  beforeEach(function () { sinon.restore(); });
  describe('Test the listAll behavior', function () {
    it('should return status 200 and a list of orders', async function () {
      const orders = [
        {
          id: 1,
          userId: 1,
          productId: [1, 2, 3],
        },
        {
          id: 2,
          userId: 2,
          productId: [4, 5, 6],
        },
      ];
      const ordersBuild = OrderModel.bulkBuild(orders);

      sinon.stub(OrderModel, 'findAll').resolves(ordersBuild);
      
      const response = await OrderService.listAll();
      expect(response.status).to.equal('SUCCESSFUL');
      expect(response.data).to.deep.equal(ordersBuild);
    });
  });
});
