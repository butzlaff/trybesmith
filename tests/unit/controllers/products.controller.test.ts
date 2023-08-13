import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import productMock from '../../mocks/products.mock';
import ProductService from '../../../src/service/products.service';
import ProductsController from '../../../src/controller/products.controller';
import ProductModel from '../../../src/database/models/product.model';

chai.use(sinonChai);

describe('Test ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });
  describe('Test the insertProduct behavior', function () {
    it('should return status 201 and a product object', async function () {
      req.body = productMock;

      const createProductStub = sinon.stub(ProductService, 'createProduct').resolves({
        status: 'CREATED',
        data: productMock.productCreatedResponse,
      });

      await ProductsController.insertProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(productMock.productCreatedResponse);
      expect(createProductStub).to.have.been.calledOnce;
    });
    it('should return status 404 and a message "Invalid data"', async function () {
      req.body = productMock;

      const createProductStub = sinon.stub(ProductService, 'createProduct').resolves({
        status: 'INVALID_DATA',
        data: { message: 'Invalid data' },
      });

      await ProductsController.insertProduct(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: 'Invalid data'});
      expect(createProductStub).to.have.been.calledOnce;
    });
    describe('Test the listAll behavior', function () {
      it('should return status 200 and a product object', async function () {

        const listProductBulk = ProductModel.bulkBuild(productMock.allProducts)
  
        const createProductStub = sinon.stub(ProductService, 'listAll').resolves({
          status: 'SUCCESSFUL',
          data: listProductBulk,
        });
  
        await ProductsController.listAll(req, res);
  
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(listProductBulk);
        expect(createProductStub).to.have.been.calledOnce;
      });
    });
});
});
