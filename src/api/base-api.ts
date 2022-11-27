import { Options } from 'src/http/Http';

export const BASE_URL = "https://ya-praktikum.tech/api/v2";
export const RESOURCES_URL = BASE_URL + "/resources";

export abstract class BaseAPI {
  create() { throw new Error('Not implemented'); }
  request(options: Options) { options; throw new Error('Not implemented'); }
  update() { throw new Error('Not implemented'); }
  delete() { throw new Error('Not implemented'); }
}
