import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { Response } from 'src/app/shared/models/response';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public loginForm!: FormGroup;
  public signupForm!: FormGroup;

  constructor(private readonly fb: FormBuilder,
    private readonly authSvc: AuthService,
    public readonly tokenSvc: TokenService,
    private readonly router: Router
    ) { }

  ngOnInit(): void {
    this.initLoginForm();
    this.initSignupForm();
  }

  private initLoginForm(): void{
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  private initSignupForm(): void{
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  public newUser(value: any){
    console.log("Usuari registrat: ", value);
  }

  public loginUser(value: User){
    this.authSvc.loginUser(value).subscribe({
      next: data => {
        this.tokenSvc.setToken(data.data.token);
        this.router.navigate(['user']);
        console.log("Usuari loguejat: ", data);
      }
    })
    //console.log("Usuari loguejat: ", value);
  }

}
