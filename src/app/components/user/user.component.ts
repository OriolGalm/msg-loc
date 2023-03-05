import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/app/shared/services/message.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';

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
  public sendImg!: string;
  public miniatura: any = "./../../assets/img/profile.png";
  public errorShow: boolean = false;
  public errorImg: string = "This image cannot be larger than 1Mb";
  errorText: string = "This text is too large";
  errorName: string = "Name have to be min 3 characters";
  errorB: boolean = false;
  errorC: boolean = false;

  constructor(
    public readonly tokenSvc: TokenService,
    private readonly userSvc: UserService,
    private readonly fb: FormBuilder,
    private readonly msgSvc: MessageService
  ) { }

  ngOnInit(): void {
    this.userId = this.tokenSvc.getId();
    this.showUser(this.userId);
    this.initForm();
    //this.getNewMsgName();
  }

  private initForm(): void {
    this.updateForm = this.fb.group({
      name: (''),
      message: ('')
    })
  }

  //Busco els nous missatges i faig el setter 
  /* private getNewMsgName() {
    this.msgSvc.newMsgName(this.userId).subscribe(res => {
      this.msgSvc.setNotRead(res.data);
      console.log("Users return: ", res.data)
    })
  } */

  public async onUpdate(value: any){
    //const token: any = this.tokenSvc.getToken();
    if(value.message.length > 100 || value.name.length > 40){
      this.errorB = true;
    }else if(value.name.length < 3){
      this.errorC = true;
    }else{
      if(this.updateForm.value.name != value.name || this.updateForm.value.message != value.message){
        this.userSvc.updateUser(this.userId, value).subscribe(
          res => console.log("Update: ", res)
        )
        this.errorB = false;
        this.errorC = false;
        this.hideForm = !this.hideForm;
      }else{
        this.hideForm = !this.hideForm;
      }
    }
  }

  public showUser(id: number){
    this.userSvc.loggedUser(id).subscribe(
      res => {this.userData = res.data;
        if(this.userData.image != null){
          this.sendImg = environment.URL_IMG + this.userData.image
        }else{
          this.sendImg = this.miniatura;
        }
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
    if(this.image.size <= 1024000){
      const reader: FileReader = new FileReader();
      reader.onload = (e:any) => {
        this.miniatura = e.target.result;
      }
      reader.readAsDataURL(this.image);
      this.addImg(this.image);
    }else{
      this.errorShow = true;
      setTimeout(() => {
        this.errorShow = false;
      }, 8000);
    }
  }

  private addImg(image: File){
    this.userSvc.updateImage(this.userId, image).subscribe(
      data => {data;
      this.showUser(this.userId)}
    )
    this.userSvc.uploadImage(image).subscribe(
      res => res
    )
  }
}
