import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { contextProvider } from '@lit-labs/context';
import { matrix } from './contexts';

export class TestHarness extends LitElement {
  /**
   * Providing a context at the root element to maintain application state
   */
  @contextProvider({ context: matrix })
  @property({ attribute: false })
  // Create a mock store with the mock data
  _matrixStore! :any;

  render() {
    return html`<slot></slot>`;
  }
}

const MockMatrixStore = {
  wrap(component: any) {

  },
};

export default MockMatrixStore;