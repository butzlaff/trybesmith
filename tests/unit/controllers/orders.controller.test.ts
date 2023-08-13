import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import OrderModel from '../../../src/database/models/order.model';
import OrdersController from '../../../src/controller/orders.controller';

chai.use(sinonChai);

describe('Test the OrdersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });
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

      await OrdersController.listAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(ordersBuild);
    });
  });
});
