
import { html, LitElement } from "lit";
import { contextProvided } from "@lit-labs/context";
import { customElement, state } from "lit/decorators.js";

import { ScopedRegistryHost } from '@lit-labs/scoped-registry-mixin';
import { matrix } from "../contexts";

@customElement('test-component')
export class TestComponent extends ScopedRegistryHost(LitElement) {
  @contextProvided({ context: matrix, subscribe: true })
  @state()
  _matrixStore: any;

  render() {
    html`<div>Example</div>`
  }
}