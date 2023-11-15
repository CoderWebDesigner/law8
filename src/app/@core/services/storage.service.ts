import { Injectable } from '@angular/core';
import { LOCAL_STORAGE_PREFIX, USER } from '@core/utilities/defines';

@Injectable({ providedIn: 'root' })
export class StorageService {

  
  /*
   * read certain item from the localStorage and
   * parse the item to json if the item is a stringified object.
   * @param  {key} The key of the property to be detected
   * @returns {Object} the returned object holds the value for the detected property
   * */
  public getStorage = (key: string) => {
      try {
        return JSON.parse(localStorage.getItem(`${LOCAL_STORAGE_PREFIX}.${key}`) as string);
      } catch (error) {
        return localStorage.getItem(`${LOCAL_STORAGE_PREFIX}.${key}`);
      }
  };

  /*
   * add/set item to browser localStorage
   * @param {key} the identifier for the localStorage item
   * @param {value} the value of localStorage item
   * */
  public setStorage = (key: string, value: any) => {
      const newKey = `${LOCAL_STORAGE_PREFIX}.${key}`;
      // don't add incase there is no value
      if (!value) return;
      // Add to localstorage
      if (typeof value === 'object') {
        localStorage.setItem(newKey, JSON.stringify(value));
      } else {
        localStorage.setItem(newKey, String(value));
      }
  };

 

   /*
   * remove item from the localStorage
   */
   removeItemStorage = (key:string) => {
    localStorage.removeItem(key);
  };

  /*
   * clear all the localStorage items
   */
   clearStorage = () => {
    localStorage.clear();
  };
}
