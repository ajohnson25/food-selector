import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

class User {
  static async login (): Promise<any> {
    // Set the UUID
    if (window.localStorage.getItem('uuid') === null) {
      window.localStorage.setItem('uuid', uuidv4());
      await this.createDBUser();
    } else {
      this.getDBUser().then((data: any) => { if (data.length === 0) { this.createDBUser(); } });
      await this.updateLastLogin();
    }

    // Get the bearer token
    this.getBearerToken().then((result) => {
      window.localStorage.setItem('bearer', result);
    });
  }

  /**
   * Gets the bearer token from the web service
   */
  static async getBearerToken (): Promise<string> {
    let bearer = '';
    try {
      const response = await axios.post(`/api/login/${window.localStorage.getItem('uuid')}`);
      bearer = response.data.token;
    } catch (error) {
      console.log(error);
    }
    return bearer;
  }

  /**
   * Creates the user in the database for the application, no password or external auth
   */
  static async createDBUser (): Promise<void> {
    try {
      await axios.post(`/api/fsuser/${window.localStorage.getItem('uuid')}`);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Creates the user in the database for the application, no password or external auth
   */
  static async getDBUser (): Promise<any> {
    try {
      const response = await axios.get(`/api/fsuser/${window.localStorage.getItem('uuid')}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Updates the last login time in the users table for the logged in user
   */
  static async updateLastLogin () {
    try {
      await axios.post(`/api/fsuser/lastlogin/${window.localStorage.getItem('uuid')}`);
    } catch (error) {
      console.log(error);
    }
  }
}

export default User;
