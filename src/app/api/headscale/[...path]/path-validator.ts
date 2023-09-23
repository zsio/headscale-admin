type HttpMethod = string;

export interface AllowedPath {
  method: ('ALL' | HttpMethod)[];
  url: string;
  // 数组中包含ALL、未定义则全部允许，如果数组有值只允许包含在数组内的query，如果为空数组则不允许携带query参数。
  query?: ('ALL' | string)[]
}


export class PathValidator {
  private allowedPaths: AllowedPath[];

  constructor(allowedPaths: AllowedPath[]) {
    this.allowedPaths = allowedPaths;
  }

  /**
   * 检查给定的请求方法和URL路径是否被允许。
   *
   * @param {HttpMethod} requestMethod - 请求的HTTP方法。
   * @param {string} requestUrl - 请求的URL。
   * @returns {boolean} 如果路径被允许，则返回true；否则返回false。
   */
  isPathAllowed(requestMethod: HttpMethod, requestUrl: string): boolean {
    if(process.env.NODE_ENV === 'development') return true;
    const url = new URL(requestUrl);
    const searchParams = new URLSearchParams(url.search);
    const requestQueryKeys = Array.from(searchParams.keys());

    return this.allowedPaths.some(path =>
      (path.method.includes('ALL') || path.method.includes(requestMethod)) &&
      this.matchUrl(path.url, url.pathname) &&
      (!requestQueryKeys.length || this.isQueryAllowed(path.query, requestQueryKeys))
    );
  }

  private matchUrl(allowedUrl: string, requestUrl: string): boolean {
    const allowedUrlParts = allowedUrl.split('/');
    const requestUrlParts = requestUrl.split('/');

    return allowedUrlParts.length === requestUrlParts.length &&
      allowedUrlParts.every((part, i) => part === requestUrlParts[i] || this.isDynamicRoute(part));
  }

  /**
   * 检查所提供的请求查询是否在允许的查询列表中。
   * 如果所提供的请求查询被允许，则返回true，否则返回false。
   *
   * @param allowedQuery - 允许的查询字符串数组。
   * @param requestQuery - 请求查询字符串数组。
   * @returns 所提供的请求查询是否被允许。
   */
  private isQueryAllowed(allowedQuery: string[] | undefined, requestQuery: string[]): boolean {
    if (!allowedQuery || allowedQuery.includes('ALL')) {
      return true;
    }

    return requestQuery.every(query => allowedQuery.includes(query));
  }

  private isDynamicRoute(urlPart: string): boolean {
    return urlPart.startsWith(':');
  }
}
