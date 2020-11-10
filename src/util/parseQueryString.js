import queryString from 'query-string';

export default function parseQueryString(parseString){
   return queryString.parse(parseString);
}