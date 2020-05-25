import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const uuid:string | null = '';

class User {
  constructor () {
    // Set the UUID
    if (window.localStorage.getItem('uuid') === null) {
      window.localStorage.setItem('uuid', uuidv4());
      this.createDBUser();
    } else {
      this.updateLastLogin();
    }

    // Get the bearer token
    this.getBearerToken().then((result) => {
      window.localStorage.setItem('bearer', result);
    })

    ;
  }

  async getBearerToken () {
    let bearer = '';
    try {
      const response = await axios.post(`/api/login/${window.localStorage.getItem('uuid')}`);
      bearer = response.data.token;
    } catch (error) {
      console.log(error);
    }
    return bearer;
  }

  async createDBUser () {
    try {
      await axios.post(`/api/fsuser/${window.localStorage.getItem('uuid')}`);
    } catch (error) {
      console.log(error);
    }
  }

  async updateLastLogin () {
    try {
      await axios.post(`/api/fsuser/lastlogin/${window.localStorage.getItem('uuid')}`);
    } catch (error) {
      console.log(error);
    }
  }

  getUUID (): string | null {
    return uuid;
  }
}

export default User;
