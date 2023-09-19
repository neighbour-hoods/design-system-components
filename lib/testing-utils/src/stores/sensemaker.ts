import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { contextProvider } from '@lit-labs/context';
import { sensemaker } from './contexts';
import { SensemakerStore } from '@neighbourhoods/client';
import { encode } from '@msgpack/msgpack';

export class SensemakerTestHarness extends LitElement {
  /**
   * Providing a context at the root element to maintain state in the tested component
   */
  @contextProvider({ context: sensemaker })
  @property({attribute: false})
  _sensemakerStore!: Partial<SensemakerStore>

  render() {
    return html`<slot></slot>`;
  }  
}


const MockSensemakerStore = {
  wrap(component: any) {

  },
};

export default MockSensemakerStore;