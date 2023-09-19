import { LitElement, html } from 'lit';
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

  },
  wrap(component: any) {

  },
};

export default MockMatrixStore;