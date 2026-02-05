import { fetcher } from "./api.fetcher";
import { FetcherOptions, ResData } from "./type.service";

export class BaseService {
  protected baseUrl: string

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || process.env.BACKEND_API_URL || ""
  }

  protected async getHeaders(extra?: HeadersInit): Promise<Record<string, string>> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    }
    if (extra) {
      if (Array.isArray(extra)) {
        extra.forEach(([key, value]) => {
          headers[key] = value;
        });
      } else {
        Object.assign(headers, extra);
      }
    }
    return headers;
  }

  async get<T>(path: string, options: FetcherOptions = {}): Promise<ResData<T>> {
    const headers = await this.getHeaders(options.headers);
    return fetcher<T>(`${this.baseUrl}${path}`, {
      method: "GET",
      headers,
      ...options,
    })
  }

  async post<T>(path: string, body: any, options: FetcherOptions = {}): Promise<ResData<T>> {
    const headers = await this.getHeaders(options.headers);
    return fetcher<T>(`${this.baseUrl}${path}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers,
      ...options,
    })
  }

}
