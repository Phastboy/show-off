import { inject } from '@angular/core';
import { AuthService } from './core/services/auth';

export function sessionInitializer() {
  const auth = inject(AuthService);
  return () => auth.loadSession();
}

