import '@webcomponents/scoped-custom-element-registry/scoped-custom-element-registry.min.js';
import stores from '..';
const { JSDOM } = require('jsdom');
import { describe, expect, test, beforeEach, afterEach } from 'vitest';
import { MatrixTestHarness, MockMatrixStoreOptions } from '../matrix';
import './test-component'
import { TestComponent } from './test-component'
import hash from '@neighbourhoods/testing-utils/factories/hash';

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

    test(`And calling the profilesStore method with different WeGroupIds gives you different stores (TODO)`, async () => {
      // expect(typeof component._matrixStore?.profilesStore).toBe('function')
    });

    test(`And calling the profilesStore method gives you a store`, async () => {
      expect(typeof component._matrixStore?.profilesStore()).toBe('object')
    });

    test(`And the store has a profiles Map`, async () => {
      expect(component._matrixStore?.profilesStore().profiles).toBeDefined
      expect(component._matrixStore?.profilesStore().profiles instanceof Map).toBeTruthy
    });

    test(`And Given a hash, When you call *get* with the hash, Then the profiles Map returns a value`, async () => {
      const getResponse = component._matrixStore?.profilesStore().profiles.get(hash());
      expect(getResponse).toBeDefined
    });
    
    test(`And the value is a mock async readable of a basic Profile`, async () => {
      const getResponse = component._matrixStore?.profilesStore().profiles.get(hash());
      expect(getResponse instanceof Object).toBe(true)
      expect(getResponse.status).toBe('complete')
      
      expect(getResponse.value.nickname).toBeDefined()
      expect(typeof getResponse.value.nickname).toBe('string')
    });
    
  });
});
