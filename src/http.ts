export interface MidasConfig {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
}

export class MidasError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = 'MidasError';
  }
}

export class HttpClient {
  private apiKey: string;
  private baseUrl: string;
  private timeout: number;

  constructor(config: MidasConfig) {
    if (!config.apiKey) throw new Error('MIDAS API key is required');
    this.apiKey = config.apiKey;
    this.baseUrl = (config.baseUrl || 'https://api.midasprotocol.org').replace(/\/+$/, '');
    this.timeout = config.timeout || 30_000;
  }

  async request<T = any>(method: string, path: string, body?: unknown, query?: Record<string, unknown>): Promise<T> {
    const url = new URL(path, this.baseUrl);

    if (query) {
      for (const [k, v] of Object.entries(query)) {
        if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
      }
    }

    const headers: Record<string, string> = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      'User-Agent': 'midas-sdk/1.0.0',
    };

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeout);

    try {
      const res = await fetch(url.toString(), {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const errMsg = data?.error?.message || data?.error || data?.message || res.statusText;
        throw new MidasError(
          typeof errMsg === 'string' ? errMsg : JSON.stringify(errMsg),
          res.status,
          data?.error?.code || data?.code,
          data,
        );
      }

      return data as T;
    } catch (err) {
      if (err instanceof MidasError) throw err;
      if ((err as Error).name === 'AbortError') {
        throw new MidasError('Request timeout', 0, 'TIMEOUT');
      }
      throw new MidasError((err as Error).message, 0, 'NETWORK_ERROR');
    } finally {
      clearTimeout(timer);
    }
  }

  get<T = any>(path: string, query?: Record<string, unknown>) { return this.request<T>('GET', path, undefined, query); }
  post<T = any>(path: string, body?: unknown) { return this.request<T>('POST', path, body); }
  put<T = any>(path: string, body?: unknown) { return this.request<T>('PUT', path, body); }
  delete<T = any>(path: string) { return this.request<T>('DELETE', path); }
}
