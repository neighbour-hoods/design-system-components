import { LitElement, TemplateResult, html } from 'lit';
import { fixture, html as testHtml } from '@open-wc/testing';
import { property } from 'lit/decorators.js';
import { contextProvider } from '@lit-labs/context';
import { matrix } from './contexts';
import { vi } from 'vitest';
import { ConfigDimension } from '@neighbourhoods/client';
import { DimensionPairNames, generateMockDimensionsResponse } from '../factories/dimension';
import { encode } from '@msgpack/msgpack';
import { html as staticHtml, unsafeStatic } from "lit/static-html.js";
import { DnaHash, HoloHash } from '@holochain/client';
import { Profile } from '@holochain-open-dev/profiles';
import { AsyncReadable, AsyncStatus, readable } from "@holochain-open-dev/stores";
import profile from '../factories/profile';

const { JSDOM } = require('jsdom');

type NestedStore = 'profiles' | 'sensemaker';

export interface MockMatrixStoreOptions {
  includeStores: NestedStore[]
  // neighbourhoods: [
  //   {
  //     name: string,
  //     includedStores: [
  //       'profiles'
  //   ]},{
  //   name: string,
  //   includedStores: [
  //     'sensemaker', 'profiles'
  //   ]}],

  includeDimensions: DimensionPairNames[]
  // Currently dimensions need to be mocked here as a zome call for dimensions is made on the matrix store's client
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

const MockMatrixStore: { store: any, mockDimensions: ConfigDimension[], init: Function, addNestedStores: Function, generateProfileStore: Function, mockLazyHoloHashMap: Function, populateNestedStores: Function, generateMockClient: Function, wrap: Function } = {
  store: {},
  mockDimensions: [] as ConfigDimension[],

  init(options: MockMatrixStoreOptions = { includeDimensions: [], includeStores: []}){
    options.includeDimensions ||= [];
    if(typeof customElements.get('matrix-test-harness') == 'undefined') customElements.define('matrix-test-harness', MatrixTestHarness)

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
    this.store.client = this.generateMockClient();

    return this.store;
  },

  addNestedStores(stores: NestedStore[]) {
    if(stores?.includes('profiles')) {
      const mockProfilesResponse = this.generateProfileStore();
      this.store.profilesStore =  vi.fn((_weGroupId: DnaHash | undefined) => mockProfilesResponse)
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

  generateProfileStore() {
    return {
      profiles: this.mockLazyHoloHashMap()
    }
  },

  mockLazyHoloHashMap() { // Currently just for profiles
    const mockMap = new Map<HoloHash,Partial<AsyncReadable<Profile | undefined>>>();
    const statusReadable = readable<AsyncStatus<Profile>>();

    mockMap.get = vi.fn((_key: HoloHash) => ({
      status: "complete", 
      subscribe: statusReadable.subscribe,
      "value": profile()
    }))
    return mockMap
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
    const staticComponent : TemplateResult = staticHtml`<${unsafeStatic(`${component}`)}></${unsafeStatic(`${component}`)}>`
    const harness : Element = await fixture(testHtml`<matrix-test-harness ._matrixStore=${this.store}>${staticComponent}</matrix-test-harness>`)
    const ref = harness.querySelector(component);
    const updateComplete = await ref?.updateComplete;
    // console.log('updateComplete for', staticComponent, ' IS :>> ', updateComplete);
    let jsdom;
    if(updateComplete) {
      jsdom = new JSDOM(ref.renderRoot.innerHTML)
    }
    return { harness, ref, jsdom }
  },
};

export default MockMatrixStore;