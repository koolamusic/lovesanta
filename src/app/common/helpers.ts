import _ from 'lodash';
import { encodeURI, decode } from 'js-base64';

export const getRandomNode = <T>(arr: T[]): T | undefined => {
  return _.sample(arr);
};

/* ----------------------------------------------------------------- */
/* A set of utilities to build URL params to handle accessing the   */
/* authenticated /dip/ page for user pairs, using base65           */
/* -------------------------------------------------------------- */
export const buildAuthPageParams = (obj: Record<string, any>) => {
  const objToString = JSON.stringify(obj);
  const authToURI = encodeURI(objToString);

  console.log(authToURI, '[helpers]:buildAuthPageParams ');
  return authToURI;
};

export const parseAuthPageParams = (param: string) => {
  const authToURI = decode(param);
  const strToObject = JSON.parse(authToURI);

  console.log(authToURI, strToObject, '[helpers]:parseAuthPageParams ');
  return strToObject;
};
