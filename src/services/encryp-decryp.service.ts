import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {ServiceKeys as keys} from '../keys/service-keys';
const CryptoJS = require('crypto-js');

@injectable({scope: BindingScope.TRANSIENT})
export class EncrypDecrypService {
  type: string;

  constructor(type: string) {
    this.type = type;
  }

  Encryp(text: string) {
    switch (this.type) {
      case keys.MD5:
        return CryptoJS.MD5(text).toString();
        break;
      case keys.AES:
        return CryptoJS.AES.encrypt(text, keys.AES_SECRET);
        break;
      case keys.SHA512:
        return CryptoJS.SHA512(text).toString();
        break;
      default:
        return 'Este tipo de cifrado no esta soportado!';
        break;
    }
  }
}
