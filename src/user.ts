import { v4 as uuidv4 } from 'uuid';
let uuid:string|null = '';

class User {
  constructor () {
    if (window.localStorage.getItem('uuid') === null) {
      window.localStorage.setItem('uuid', uuidv4());
    }
    uuid = window.localStorage.getItem('uuid');
  }

  getUUID (): string | null {
    return uuid;
  }
}

export default User;
