import { faker } from '@faker-js/faker';
import { ConfigDimension, Dimension } from '@neighbourhoods/client';
import hash from "./hash";
import range from "./range";

export const OBJECTIVE_DIMENSION_NAMES = ['total_importance', 'average_heat', 'total_likes', 'average_stars', 'total_flags'];
export const SUBJECTIVE_DIMENSION_NAMES = ['importance', 'heat', 'like', 'star', 'flag'];

export type DimensionPairNames = 'likes/total-likes' | 'importance/total-importance';

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

export function generateMockDimensionsResponse(dimensionPairs: DimensionPairNames[]) : ConfigDimension[] {
  const dimensions = dimensionPairs.map((val) => val.split("/")).flat();

  return dimensions.map((dimensionName: string) => ({
      "name": dimensionName,
      "range": range(dimensionName),
      "computed": OBJECTIVE_DIMENSION_NAMES.includes(dimensionName)
  }))
}

export default dimension;