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

const MockMatrixStore = {
  mockDimensions: [] as ConfigDimension[],

  init(options: MockMatrixStoreOptions = { includeDimensions: [], includeStores: []}){
    const store : any = {};

    if(options.includeDimensions.length > 0) {
      this.mockDimensions = generateMockDimensionsResponse(options.includeDimensions)// Todo: need to stringify values? //.map((dimension: ConfigDimension) => (dimension))
    }
    if(options?.includeStores?.includes('profiles')) {
    }
    if(options?.includeStores?.includes('sensemaker')) {
    }

    if(typeof customElements.get('matrix-test-harness') == 'undefined') customElements.define('matrix-test-harness', MatrixTestHarness)
    
    // Set up mocks for direct zome calls as needed/implemented by your component
    // const mockClient = () => ({
    //   appInfo: vi.fn(() => ({
    //     cell_info: {
    //       sensemaker: [null, { cloned: { cell_id: 'mock-cell-id' } }],
    //     },
    //   })),
    //   callZome: vi.fn(({functionName} : any) => {
    //     switch (functionName) {
    //       case 'get_dimensions':
    //         return this.mockDimensions.map((dimension : string) => ({entry: { Present: { 'entry': encode({...dimension}) } }}))
    //       default:
    //         break;
    //     }
    //   }),
    // });
    // store.client = mockClient();

    return store;
  },

  async wrap(component: any) {
    return fixture(testHtml`<matrix-test-harness>${component}</matrix-test-harness>`)
  },
};

export default MockMatrixStore;