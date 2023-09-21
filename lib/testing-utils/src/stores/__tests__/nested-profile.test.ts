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

describe('When a mock Matrix store is initialised with options for a nested Profiles store', () => {
  let store: any;
  let harness: any;
  let component: any;
  let jsdom: any;

  beforeEach(() => {
    store = stores.matrix
    store.init({ includeStores: [ 'profiles']} as MockMatrixStoreOptions)
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

    test(`And the Matrix store state is mocked in the test-component`, async () => {
      expect(component._matrixStore).toBeDefined()
    });

    test(`And the Matrix store has a mock profilesStore method`, async () => {
      expect(typeof component._matrixStore?.profilesStore).toBe('function')
    });
    
  });
});
