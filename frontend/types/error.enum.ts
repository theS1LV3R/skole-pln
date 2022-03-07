export enum ErrorEnum {
  /**
   * JWT token expired
   */
  TOKEN_EXPIRED = 1 << 0,

  /**
   * Refresh token invalid, not found or revoked,
   * replaced by another token, or user not found
   */
  REFRESH_TOKEN_INVALID = 1 << 1,
}
