import { faker } from '@faker-js/faker';
import { Dimension } from '@neighbourhoods/client';
import hash from "./hash";

const OBJECTIVE_DIMENSION_NAMES = ['total_likes', 'average_stars', 'total_flags'];
const SUBJECTIVE_DIMENSION_NAMES = ['like', 'star', 'flag'];

interface DimensionOptions {
  objective?: boolean
}

function dimension(options: DimensionOptions = { objective: false }): Dimension {
  return {
    name: faker.helpers.arrayElement(options.objective ? OBJECTIVE_DIMENSION_NAMES : SUBJECTIVE_DIMENSION_NAMES),
    computed: options.objective || false,
    range_eh: hash()
  };
}

export default dimension;