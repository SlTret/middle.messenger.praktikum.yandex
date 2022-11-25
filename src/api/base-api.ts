import { Options } from 'src/http/Http';
  
  export abstract class BaseAPI {
    create() { throw new Error('Not implemented'); }
    request( options: Options) { options; throw new Error('Not implemented'); }
    update() { throw new Error('Not implemented'); }
    delete() { throw new Error('Not implemented'); }
}