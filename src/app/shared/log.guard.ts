import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './services/token.service';

@Injectable({
  providedIn: 'root'
})
export class LogGuard implements CanActivate {

  constructor(
    private readonly tokenSvc: TokenService,
    private readonly router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.tokenSvc.getToken()){
        this.router.navigate(['/']);
        return false;
      }
      this.tokenSvc.expiratedToken();
    return true;
  }
  
}
