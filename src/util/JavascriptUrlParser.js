const jsPrefix = "javascript:";
export default class JavascriptUrlParser {
  static isValid(url) {
    // is string
    if (typeof url == "string" || url instanceof String) {
      return url.trim().startsWith(jsPrefix);
    } else return false;
  }
  static decode(url) {
    if (JavascriptUrlParser.isValid(url)) {
      const encodedJS = url.trim().replace(jsPrefix, "");
      return decodeURIComponent(encodedJS);
    } else return url;
  }
  static encode(script) {
    const encodedJs = encodeURIComponent(script);
    return jsPrefix + encodedJs;
  }
}
