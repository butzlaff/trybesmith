import { expect } from 'chai';
import sinon from 'sinon';
import productsService from '../../../src/service/products.service';
import ProductModel from '../../../src/database/models/product.model';

describe('Test the ProductsService', function () {
  beforeEach(function () { sinon.restore(); });
  describe('Test the createProduct behavior', function () {
    it('should return status 201 and a product object', async function () {
      const product = {
        id: 1,
        name: "Martelo de Thor Quebrado",
        price: "1 peça de ouro",
        orderId: 5
      }
      
      const productBuild = ProductModel.build(product);

      sinon.stub(ProductModel, 'create').resolves(productBuild);
     
      const response = await productsService.createProduct(product);
  
      expect(response.status).to.equal('CREATED');
      expect(response.data).to.deep.equal(product);
    });
});
});
