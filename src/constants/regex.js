export const NOT_NULL = /.+/;
export const AT_LEAST_8_CHAR = /(?=.{8,})/;
export const AT_LEAST_1_NUMERICAL_CHAR = /(?=.*[0-9])/;
export const AT_LEAST_1_ALPHABETICAL_CHAR = /(?=.*[a-z])|(?=.*[A-Z])/;
export const PHONE_NUMBER = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
export const EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
