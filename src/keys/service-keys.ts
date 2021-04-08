export namespace ServiceKeys {
  export const MD5 = 'md5';
  export const AES = 'aes';
  export const AES_SECRET = 'aes@secret';
  export const SHA512 = 'sha512';
  export const TOKEN_EXPIRATION_TIME = Math.floor(Date.now() / 1000) * 3600;
  export const JWT_SECRET_KEY = '*app@rrhh*';
}
