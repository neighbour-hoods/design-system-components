import { LitElement, html } from 'lit';
import { fixture, html as testHtml } from '@open-wc/testing';
import { property } from 'lit/decorators.js';
import { contextProvider } from '@lit-labs/context';
import { matrix } from './contexts';
import { vi } from 'vitest';
import { ConfigDimension } from '@neighbourhoods/client';
import { DimensionPairNames, generateMockDimensionsResponse } from '../factories/dimension';
import { encode } from '@msgpack/msgpack';

type NestedStore = 'profiles' | 'sensemaker';

export interface MockMatrixStoreOptions {
  includeStores: NestedStore[]
  includeDimensions: DimensionPairNames[]
};
export class MatrixTestHarness extends LitElement {
  /**
   * Providing a context at the root element to maintain state in the tested component
   */
  @contextProvider({ context: matrix })
  @property({ attribute: false })
  _matrixStore! :any;

  render() {
    return html`<slot></slot>`;
  }
}

const MockMatrixStore: { mockDimensions: ConfigDimension[], init: Function, addNestedStores: Function, populateNestedStores: Function, generateMockClient: Function, wrap: Function } = {
  mockDimensions: [] as ConfigDimension[],

  init(options: MockMatrixStoreOptions = { includeDimensions: [], includeStores: []}){
    if(typeof customElements.get('matrix-test-harness') == 'undefined') customElements.define('matrix-test-harness', MatrixTestHarness)

    const store : any = {};

    /**
     * Setting up mock store Sensemaker primitives
    */

    if(options.includeDimensions.length > 0) {
      /**
       * DIMENSIONS:
      */ 
      this.mockDimensions = generateMockDimensionsResponse(options.includeDimensions)// Todo: need to stringify values? //.map((dimension: ConfigDimension) => (dimension))
    }
    
    /**
     * Adding nested stores where requested & populating
    */
    this.addNestedStores(options.includeStores)
    this.populateNestedStores(options.includeStores)

    // Set up mocks for direct zome calls as needed/implemented by your component
    store.client = this.generateMockClient();

    return store;
  },

  addNestedStores(stores: NestedStore[]) {
    if(stores?.includes('profiles')) {
    }
    if(stores?.includes('sensemaker')) {
    }
  },

  populateNestedStores(stores: NestedStore[]) {
    if(stores?.includes('profiles')) {
    }
    if(stores?.includes('sensemaker')) {
    }
  },

  generateMockClient() {
    return {
      appInfo: vi.fn(() => ({
        cell_info: {
          sensemaker: [null, { cloned: { cell_id: 'mock-cell-id' } }], // TODO: add cell factory and use here?
        },
      })),
      callZome: vi.fn(({functionName} : any) => {
        switch (functionName) {
          case 'get_dimensions':
            return this.mockDimensions.map((dimension : ConfigDimension) => ({entry: { Present: { 'entry': encode({...dimension}) } }}))
          // case 'another_zome_call':
            // Add your mock response here for direct zome calls
          default:
            return {}
        }
      }),
    }
  },

  async wrap(component: any) {
    return fixture(testHtml`<matrix-test-harness>${component}</matrix-test-harness>`)
  },
};

export default MockMatrixStore;