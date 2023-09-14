import { faker } from '@faker-js/faker';

function hash() : Uint8Array {
  return Uint8Array.from(faker.helpers.multiple(() => faker.number.int({ min: 0, max: 255 }), { count: 39 }))
}

export default hash;