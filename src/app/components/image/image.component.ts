import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  public selectedFile!: File;
  private userId!: any;

  constructor(private readonly http: HttpClient,
    private tokenSvc: TokenService) { }

  ngOnInit(): void {
    this.userId = this.tokenSvc.getId();
  }

  public handleImage(event: any){
    this.selectedFile = <File>event.target.files[0];
  }

  public onUpload(){
    const fd = new FormData();
    fd.append('image', this.selectedFile);
    console.log("JSONData: ", fd);
    return this.http.post<File>("http://localhost:8080/api/image/" + this.userId, fd).subscribe(
      res => {
        console.log("Response: ", res);
      }
    )
  }

}
