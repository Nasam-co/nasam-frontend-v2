import Cookies from "js-cookie";

export const getCookie = (name: string) => {
  return Cookies.get(name);
};

export const setCookie = (name: string, value: string, options?: Cookies.CookieAttributes) => {
  const defaultOptions: Cookies.CookieAttributes = {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: 7, // 7 days
    ...options
  };
  
  Cookies.set(name, value, defaultOptions);
};

export const setSecureCookie = (name: string, value: string, options?: Cookies.CookieAttributes) => {
  const secureOptions: Cookies.CookieAttributes = {
    secure: true,
    sameSite: 'strict',
    expires: 1, // 1 day for sensitive data
    ...options
  };
  
  Cookies.set(name, value, secureOptions);
};

export const removeCookie = (name: string) => {
  Cookies.remove(name);
};