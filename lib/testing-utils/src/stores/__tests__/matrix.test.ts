import '@webcomponents/scoped-custom-element-registry/scoped-custom-element-registry.min.js';
import stores from '..';
// const { JSDOM } = require('jsdom');
import { describe, expect, test, beforeEach, afterEach } from 'vitest';
import { MatrixTestHarness, MockMatrixStoreOptions } from '../matrix';
import { ConfigDimension } from '@neighbourhoods/client';

/**
 * @vitest-environment jsdom
 */

describe('When a mock Matrix store is initialised with a dimensions-pair', () => {
    let store: any;
    beforeEach(() => {
      store = stores.matrix
      store.init({ includeDimensions: ([ 'likes/total-likes'])} as MockMatrixStoreOptions)
      // console.log('Dimensions: ', store.mockDimensions)
    });
    afterEach(() => {
      store = undefined;
    });

    test(`Then 2 dimensions are mocked`, async () => {
      
      expect(store.mockDimensions).toBeDefined()
      expect(store.mockDimensions.length).toEqual(2)
    });

    test(`And 1 is computed, 1 is not`, async () => {
      const objectiveDimensions = store.mockDimensions.filter((dimension: ConfigDimension) => dimension.computed);
      const subjectiveDimensions = store.mockDimensions.filter((dimension: ConfigDimension) => !dimension.computed);

      expect(objectiveDimensions.length).toEqual(1)
      expect(subjectiveDimensions.length).toEqual(1)
    });

    test(`And the dimensions have the correct names`, async () => {
      const objectiveDimensions = store.mockDimensions.filter((dimension: ConfigDimension) => dimension.computed);
      const subjectiveDimensions = store.mockDimensions.filter((dimension: ConfigDimension) => !dimension.computed);

      expect(objectiveDimensions[0]['name']).toEqual('total-likes')
      expect(subjectiveDimensions[0]['name']).toEqual('likes')
    });

});

describe('When a mock Matrix store is initialised with state', () => {
  let store: any;
  let component: any;

  beforeEach(() => {
    store = stores.matrix
    store.init({ includeDimensions: ([ 'likes/total-likes'])} as MockMatrixStoreOptions)
  });
  afterEach(() => {
    store = undefined;
    component = undefined;
  });

  describe('And a Matrix store provider wraps a test-component', () => {
    beforeEach(async() => {
      component = await store.wrap('test-component');
    });
    test(`Then a component is returned`, async () => {
      expect(component).toBeDefined()
      expect(component instanceof MatrixTestHarness).toBeTruthy()
    });
    test(`And the component state is mocked in the test-component`, async () => {
      // expect(component instanceof MatrixTestHarness).toBeTruthy()
    });

    // test(`And 1 is computed, 1 is not`, async () => {
    //   const objectiveDimensions = store.mockDimensions.filter((dimension: ConfigDimension) => dimension.computed);
    //   const subjectiveDimensions = store.mockDimensions.filter((dimension: ConfigDimension) => !dimension.computed);

    //   expect(objectiveDimensions.length).toEqual(1)
    //   expect(subjectiveDimensions.length).toEqual(1)
    // });

    // test(`And the dimensions have the correct names`, async () => {
    //   const objectiveDimensions = store.mockDimensions.filter((dimension: ConfigDimension) => dimension.computed);
    //   const subjectiveDimensions = store.mockDimensions.filter((dimension: ConfigDimension) => !dimension.computed);

    //   expect(objectiveDimensions[0]['name']).toEqual('total-likes')
    //   expect(subjectiveDimensions[0]['name']).toEqual('likes')
    // });
  });
});
