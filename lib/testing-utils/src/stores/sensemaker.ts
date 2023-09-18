import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { contextProvider } from '@lit-labs/context';
import { sensemaker } from './contexts';
import { SensemakerStore } from '@neighbourhoods/client';

export class TestHarness extends LitElement {
  /**
   * Providing a context at the root element to maintain application state
   */
  @contextProvider({ context: sensemaker })
  @property({attribute: false})
  // Create a mock store with the mock data
  _sensemakerStore: Partial<SensemakerStore>

  render() {
    return html`<slot></slot>`;
  }  
}


const MockSensemakerStore = {
  wrap(component: any) {

  },
};

export default MockSensemakerStore;