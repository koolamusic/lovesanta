import _ from "lodash";
import { encodeURI, decode } from "js-base64";

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

  console.log(authToURI, "[helpers]:buildAuthPageParams ");
  return authToURI;
};

export const parseAuthPageParams = (param: string) => {
  const authToURI = decode(param);
  const strToObject = JSON.parse(authToURI);

  console.log(authToURI, strToObject, "[helpers]:parseAuthPageParams ");
  return strToObject;
};

/**
 * @function calculateDaysAgo
 * @param dateString
 */
export const calculateDaysAgo = (dateString: string): string => {
  const eventDate = new Date(dateString);
  const today = new Date();

  if (eventDate > today) {
    const daysToGo = Math.ceil(
      (eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );
    return `${daysToGo} days to go`;
  }
  const diffTime = Math.abs(today.getTime() - eventDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return `${diffDays} days ago`;
};
