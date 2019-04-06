/**
 * Stringify an object with params into a query string.
 * @param {Object} params - The parameters.
 */
export default function getQueryString(
  params: { [key in string | number]: any },
) {
  return Object.entries(params)
    .map(([key, value]) => key + '=' + value)
    .join('&');
}
