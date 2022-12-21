import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { TokenService } from 'src/app/shared/services/token.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public userData!: any;
  public hideForm: boolean = true;
  //public updateForm!: FormGroup;
  private userId!: any;

  constructor(public readonly tokenSvc: TokenService,
    private readonly userSvc: UserService,
    private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.userId = this.tokenSvc.getId();
    this.showUser(this.userId);
    //this.initUpdateForm();
  }

  /* private initUpdateForm(): void {
    this.updateForm = this.fb.group({
      name: '',
      message: ''
    })
  } */

  public updateForm = new FormGroup({
    name: new FormControl (''),
    message: new FormControl ('')
  })

  public async onUpdate(value: any){
    this.userSvc.updateUser(this.userId, value).subscribe(
      res => console.log("Update: ", res)
    )
    this.hideForm = !this.hideForm;
  }

  public showUser(id: number){
    this.userSvc.oneUser(id).subscribe(
      res => {this.userData = res.data;
      //console.log("User: ", this.userData)
    })
  }

  public changeForm(): void {
    this.hideForm = !this.hideForm;
  }

  /* public update(user: User){
    this.userSvc.updateUser(user.id, user).subscribe(
      (res: User) => console.log("User: ", res)
    )
  } */
}
