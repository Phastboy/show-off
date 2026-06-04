import { inject, Service, PLATFORM_ID, REQUEST } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Service()
export class CookieService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  // REQUEST is only available during SSR; null on the browser
  private readonly request = inject(REQUEST, { optional: true });

  get(name: string): string | null {
    const cookieString = this.isBrowser
      ? document.cookie
      : (this.request?.headers.get('cookie') ?? '');

    return parseCookie(cookieString, name);
  }

  set(name: string, value: string, options: CookieOptions = {}): void {
    if (!this.isBrowser) return; // mutations are browser-only

    const { maxAge = 60 * 60 * 24 * 7, path = '/', sameSite = 'Lax', secure = false } = options;

    let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    cookie += `; Max-Age=${maxAge}`;
    cookie += `; Path=${path}`;
    cookie += `; SameSite=${sameSite}`;
    if (secure) cookie += '; Secure';

    document.cookie = cookie;
  }

  delete(name: string, path = '/'): void {
    if (!this.isBrowser) return;
    document.cookie = `${encodeURIComponent(name)}=; Max-Age=0; Path=${path}`;
  }
}

export interface CookieOptions {
  maxAge?: number;
  path?: string;
  sameSite?: 'Strict' | 'Lax' | 'None';
  secure?: boolean;
}

function parseCookie(cookieString: string, name: string): string | null {
  if (!cookieString) return null;
  for (const chunk of cookieString.split(';')) {
    const eqIdx = chunk.indexOf('=');
    if (eqIdx === -1) continue;
    const key = chunk.slice(0, eqIdx).trim();
    if (key === name) {
      return decodeURIComponent(chunk.slice(eqIdx + 1).trim());
    }
  }
  return null;
}
