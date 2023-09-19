import { faker } from '@faker-js/faker';
import { Range } from '@neighbourhoods/client';

const inputInteger1: Range = {
  "name": "1-scale",
  "kind": {
      "Integer": { "min": 0, "max": 1 }
  }
}
const inputInteger5: Range = {
  "name": "5-scale",
  "kind": {
      "Integer": { "min": 0, "max": 4 }
  }
}
const outputIntegerBig: Range = {
  "name": "1-scale-total",
  "kind": {
      "Integer": { "min": 0, "max": 1000000 }
  }
}

const ALL_RANGES = [inputInteger1, inputInteger5, outputIntegerBig]

function range(forDimension: string): Range {
  switch (forDimension) {
    case 'likes':
      return inputInteger1
    case 'importance':
      return inputInteger1
    case 'total-importance':
      return outputIntegerBig
    case 'total-likes':
      return outputIntegerBig
    default:
      return faker.helpers.arrayElement(ALL_RANGES)
  }
}

export default range;