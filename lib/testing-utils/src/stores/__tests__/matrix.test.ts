import '@webcomponents/scoped-custom-element-registry/scoped-custom-element-registry.min.js';
import stores from '..';
const { JSDOM } = require('jsdom');
import { describe, expect, test, beforeEach, afterEach } from 'vitest';
import { MatrixTestHarness, MockMatrixStoreOptions } from '../matrix';
import { ConfigDimension } from '@neighbourhoods/client';
import './test-component'
import { TestComponent } from './test-component'

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
  let harness: any;
  let component: any;
  let jsdom: any;

  beforeEach(() => {
    store = stores.matrix
    store.init({ includeDimensions: ([ 'likes/total-likes'])} as MockMatrixStoreOptions)
  });
  afterEach(() => {
    store = undefined;
    harness = undefined;
    component = undefined;
    jsdom = undefined;
  });

  describe('And a Matrix store provider wraps a test-component', () => {
    beforeEach(async() => {
      const wrapped = await store.wrap('test-component')
      harness = wrapped.harness;
      component = wrapped.ref;
      jsdom = wrapped.jsdom;
    });

    test(`Then a test harness is returned`, async () => {
      expect(harness).toBeDefined()
      expect(harness instanceof MatrixTestHarness).toBeTruthy()
    });
    test(`And the inner component is rendered and returned`, async () => {
      expect(component).toBeDefined()
      expect(component instanceof TestComponent).toBeTruthy()
    });

    test(`And a JSDOM is returned`, async () => {
      expect(jsdom).toBeDefined()
      expect(jsdom instanceof JSDOM).toBeTruthy()
    });
    test(`And the inner component can be queried via the JSDOM`, async () => {
      expect(jsdom.window.document.querySelector('div')).toBeDefined()
    });

    test(`And the Matrix store state is mocked in the test-component`, async () => {
      expect(component._matrixStore).toBeDefined()
    });

    test(`And the Matrix store has a mock client with appInfo and callZome methods`, async () => {
      expect(component._matrixStore.client).toBeDefined()
      expect(typeof component._matrixStore.client).toBe('object')

      expect(typeof component._matrixStore.client?.appInfo).toBe('function')
      expect(typeof component._matrixStore.client?.callZome).toBe('function')
    });
    
  });
});
