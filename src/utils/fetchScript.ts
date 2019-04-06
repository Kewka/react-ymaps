/**
 * Creates script element with specified source (url) and append it to the DOM.
 * @param url The script src.
 */
export default function fetchScript(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.onload = resolve;
    script.onerror = reject;
    script.src = url;

    document.body.appendChild(script);
  });
}
