import { faker } from '@faker-js/faker';
import { Assessment } from '@neighbourhoods/client';
import hash from "./hash";

interface AssessmentOptions {
  objective?: boolean
}

function assessment(options: AssessmentOptions = { objective: false }): Assessment {
  return {
    value: { Integer: 1 },
    dimension_eh: hash(),
    resource_eh: hash(),
    resource_def_eh: hash(),
    author: hash(),
    timestamp: faker.date.anytime().valueOf(),
    maybe_input_dataset: null
  };
}

export default assessment;