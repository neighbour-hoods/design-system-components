import { faker } from '@faker-js/faker';
import { Profile } from '@holochain-open-dev/profiles';

function profile() : Profile {
  return {
    nickname: faker.person.firstName('female'),
    fields: {} 
  }
}

export default profile;