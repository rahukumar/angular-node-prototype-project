import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userForm:any
  constructor(private formBuilder:FormBuilder,private _userService:UserService) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required,ValidationService.passwordValidator],
    });
  }
  logIn(){
    this._userService.createUser(this.userForm.value).subscribe(res=>{
      console.log("user created",res)
    })
  }

}
