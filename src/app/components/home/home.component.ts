import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public loginForm!: FormGroup;
  public signupForm!: FormGroup;

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.initLoginForm();
    this.initSignupForm();
  }

  private initLoginForm(): void{
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
    console.log("Login: ", this.loginForm);
  }

  private initSignupForm(): void{
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
    console.log("Registre: ", this.signupForm);
  }

  public newUser(value: any){
    console.log("Usuari registrat: ", value);
  }

  public loginUser(value: any){
    console.log("Usuari loguejat: ", value);
  }

}
