import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private readonly router: Router) { }

  public setToken(token: string): void{
    sessionStorage.removeItem('AuthToken');
    sessionStorage.setItem('AuthToken', token);
  }

  public getToken(): string{
    return sessionStorage.getItem('AuthToken') as string;
  }

  public isLogged(): boolean{
    if(this.getToken()){
      return true;
    }
    return false;
  }

  public getId(): number | null{
    if(!this.isLogged()){
      return null;
    }
    const userId: number = this.getPayload().data.id;
    return userId; 
  }  

  public getName(): string | null{
    if(!this.isLogged()){
      return null;
    }
    const userName: string = this.getPayload().data.name;
    return userName; 
  }

  public getEmail(): string | null{
    if(!this.isLogged()){
      return null;
    }
    const email: string = this.getPayload().data.email;
    return email; 
  }

  private getPayload(){
    const token = this.getToken();
    const encodedData = token.split('.')[1];
    const decodedData = window.atob(encodedData);
    const payload = JSON.parse(decodedData);
    return payload;
  }

  public logOut(){
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['home']);
  }
}
