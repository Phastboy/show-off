import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Public routes — safe to prerender
  { path: 'auth/login', renderMode: RenderMode.Prerender },
  { path: 'auth/register', renderMode: RenderMode.Prerender },

  // Auth-gated routes — must render per-request so the cookie is available
  { path: '**', renderMode: RenderMode.Server },
];
