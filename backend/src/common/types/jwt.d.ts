/**
 *JWT payload
 *
 * @export
 * @interface JwtPayload
 */
export interface JwtPayload {
  /**
   * iss (issuer): Issuer of the JWT
   *
   * @type {string}
   * @memberof JwtPayload
   */
  iss?: string;

  /**
   *sub (subject): Subject of the JWT (the user)
   *
   * @type {(string | number)}
   * @memberof JwtPayload
   */
  sub?: string | number;

  /**
   *aud (audience): Recipient for which the JWT is intended
   *
   * @type {(string | number)}
   * @memberof JwtPayload
   */
  aud?: string | number;

  /**
   *exp (expiration time): Time after which the JWT expires
   *
   * @type {(number | Date)}
   * @memberof JwtPayload
   */
  exp?: number | Date;

  /**
   *nbf (not before time): Time before which the JWT must not be accepted for processing
   *
   * @type {(number | Date)}
   * @memberof JwtPayload
   */
  nbf?: number | Date;

  /**
   *iat (issued at time): Time at which the JWT was issued; can be used to determine age of the JWT
   *
   * @type {(number | Date)}
   * @memberof JwtPayload
   */
  iat?: number | Date;

  /**
   *jti (JWT ID): Unique identifier; can be used to prevent the JWT from being replayed (allows a token to be used only once)
   *
   * @type {(string | number)}
   * @memberof JwtPayload
   */
  jti?: string | number;

  [key: string]: any;
}
