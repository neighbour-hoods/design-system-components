import { createContext } from '@lit-labs/context';
import { SensemakerStore } from '@neighbourhoods/client';

// Create a mock context with the mock store for each store type

const matrix = createContext<Partial<any>>('hc_zome_we/matrix_context');
//  TODO: type this by moving Matrix Store type out of launcher??

const sensemaker = createContext<Partial<SensemakerStore>>('sensemaker-store-context');

export { matrix, sensemaker }