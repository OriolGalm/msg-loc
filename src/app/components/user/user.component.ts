import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TokenService } from 'src/app/shared/services/token.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public updateForm!: FormGroup;
  public userData!: any;
  public hideForm: boolean = true;
  private userId!: any;
  public image!: File;
  public miniatura: any = "./../../assets/img/clouds.jpg";

  constructor(public readonly tokenSvc: TokenService,
    private readonly userSvc: UserService,
    private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.userId = this.tokenSvc.getId();
    this.showUser(this.userId);
    this.initForm();
  }

  private initForm(): void {
    this.updateForm = this.fb.group({
      name: (''),
      message: ('')
    })
  }

  public async onUpdate(value: any){
    if(this.updateForm.value.name != value.name || this.updateForm.value.message != value.message){
      this.userSvc.updateUser(this.userId, value).subscribe(
        res => console.log("Update: ", res)
      )
      this.hideForm = !this.hideForm;
    }else{
      this.hideForm = !this.hideForm;
    }
  }

  public showUser(id: number){
    this.userSvc.oneUser(id).subscribe(
      res => {this.userData = res.data;
    });
  }

  public changeForm(): void {
    this.hideForm = !this.hideForm;
    this.updateForm.setValue({
      name: this.userData.name,
      message: this.userData.message
    })
  }

  public handleImage(event: any){
    this.image = <File>event.target.files[0];
   
    const reader: FileReader = new FileReader();
    reader.onload = (e:any) => {
      this.miniatura = e.target.result;
    }
    reader.readAsDataURL(this.image);
    
    this.addImg(this.image);
  }

  private addImg(image: File){
    this.userSvc.updateImage(this.userId, image).subscribe(
      data => {
        console.log("Imatge: ", data)
      }
    )
  }
}
