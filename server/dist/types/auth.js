export var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["USER"] = "user";
    UserRole["MODERATOR"] = "moderator";
})(UserRole || (UserRole = {}));
export var TokenType;
(function (TokenType) {
    TokenType["ACCESS"] = "access";
    TokenType["REFRESH"] = "refresh";
    TokenType["EMAIL_VERIFICATION"] = "email_verification";
    TokenType["PASSWORD_RESET"] = "password_reset";
})(TokenType || (TokenType = {}));
export var AuthErrorCode;
(function (AuthErrorCode) {
    AuthErrorCode["INVALID_CREDENTIALS"] = "INVALID_CREDENTIALS";
    AuthErrorCode["USER_NOT_FOUND"] = "USER_NOT_FOUND";
    AuthErrorCode["USER_ALREADY_EXISTS"] = "USER_ALREADY_EXISTS";
    AuthErrorCode["ACCOUNT_LOCKED"] = "ACCOUNT_LOCKED";
    AuthErrorCode["EMAIL_NOT_VERIFIED"] = "EMAIL_NOT_VERIFIED";
    AuthErrorCode["INVALID_TOKEN"] = "INVALID_TOKEN";
    AuthErrorCode["TOKEN_EXPIRED"] = "TOKEN_EXPIRED";
    AuthErrorCode["TOKEN_REVOKED"] = "TOKEN_REVOKED";
    AuthErrorCode["WEAK_PASSWORD"] = "WEAK_PASSWORD";
    AuthErrorCode["PASSWORD_MISMATCH"] = "PASSWORD_MISMATCH";
    AuthErrorCode["UNAUTHORIZED"] = "UNAUTHORIZED";
    AuthErrorCode["FORBIDDEN"] = "FORBIDDEN";
    AuthErrorCode["RATE_LIMIT_EXCEEDED"] = "RATE_LIMIT_EXCEEDED";
    AuthErrorCode["INTERNAL_ERROR"] = "INTERNAL_ERROR";
})(AuthErrorCode || (AuthErrorCode = {}));
export var AuthAuditAction;
(function (AuthAuditAction) {
    AuthAuditAction["LOGIN_ATTEMPT"] = "login_attempt";
    AuthAuditAction["LOGIN_SUCCESS"] = "login_success";
    AuthAuditAction["LOGIN_FAILED"] = "login_failed";
    AuthAuditAction["LOGOUT"] = "logout";
    AuthAuditAction["REGISTER_ATTEMPT"] = "register_attempt";
    AuthAuditAction["REGISTER_SUCCESS"] = "register_success";
    AuthAuditAction["REGISTER_FAILED"] = "register_failed";
    AuthAuditAction["TOKEN_REFRESH"] = "token_refresh";
    AuthAuditAction["PASSWORD_CHANGE"] = "password_change";
    AuthAuditAction["PASSWORD_RESET_REQUEST"] = "password_reset_request";
    AuthAuditAction["PASSWORD_RESET_SUCCESS"] = "password_reset_success";
    AuthAuditAction["EMAIL_VERIFICATION"] = "email_verification";
    AuthAuditAction["ACCOUNT_LOCKED"] = "account_locked";
    AuthAuditAction["ACCOUNT_UNLOCKED"] = "account_unlocked";
})(AuthAuditAction || (AuthAuditAction = {}));
