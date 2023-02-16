import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('modalHide') public modalHide!:ElementRef;

  public loginForm!: FormGroup;
  public signupForm!: FormGroup;
  public errorArray: string[] = [];
  public successMessage: string = "You've been registered";
  public errorShow: boolean = false;
  public successShow: boolean = false;
  public hide: boolean = true;

  constructor(
    private readonly fb: FormBuilder,
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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  private initSignupForm(): void{
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(40)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  public loginUser(value: User){
    if(this.loginForm.valid){
      this.authSvc.loginUser(value).subscribe({
        next: data => {
          if(data.error == true){
            this.errorArray = [];
            this.errorArray.push(data.messages);
            JSON.stringify(this.errorArray);
            this.errorShow = true;
            setTimeout(() => {
              this.errorShow = false;
            }, 10000);
            console.log("Error: ", JSON.stringify(data.error));
          }else{
            this.tokenSvc.setToken(data.data.token);
            this.router.navigate(['user']);
            this.errorShow = false;
        }}
      })
    }else{
      const errorFront = "Invalid";
      this.errorArray = [];
      this.errorArray.push(errorFront);
      this.errorShow = true;
        setTimeout(() => {
          this.errorShow = false;
        }, 8000);
    }
  }

  public newUser(value: User){
    if(this.signupForm.valid){
      this.authSvc.signupUser(value).subscribe({
        next: data => {
          if(data.error == true){
            this.errorArray = [];
            this.errorArray.push(data.message);
            JSON.stringify(this.errorArray);
            this.errorShow = true;
            setTimeout(() => {
              this.errorShow = false;
            }, 8000);
          }else{
            this.successMessage;
            this.successShow = true;
            setTimeout(() => {
              this.successShow = false;
            }, 8000);
            this.modalHide.nativeElement.click();
          }
        }
      })
    }else{
      const errorFront = "Fill in the blanks";
      this.errorArray = [];
      this.errorArray.push(errorFront);
      this.errorShow = true;
        setTimeout(() => {
          this.errorShow = false;
        }, 8000);
    }
  }

}
