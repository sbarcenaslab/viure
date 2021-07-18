import feathers from '@feathersjs/feathers';
import auth from '@feathersjs/authentication-client';
import AsyncStorage from '@react-native-community/async-storage';
import feathersRest from '@feathersjs/rest-client';

const URL = 'https://api-extends.viure.co';
export const client = feathers();

client.configure(feathersRest(URL).fetch(fetch));
client.configure(
  auth({
    storage: AsyncStorage,
    strategy: 'jwt',
    storageKey: 'accessToken',
  }),
);
