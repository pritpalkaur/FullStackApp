import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const username = localStorage.getItem('username');
  if (username) {
    return true; // logged in
  } else {
    const router = new Router();
    router.navigate(['/login']);
    return false;
  }
};
