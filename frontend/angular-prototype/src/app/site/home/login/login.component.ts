import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ActivatedRouteSnapshot, Router, ActivatedRoute } from '@angular/router';
// import { Router, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userForm:any
  constructor(private activatedRoute:ActivatedRoute,
    private router:Router,private formBuilder:FormBuilder,private _userService:UserService) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.compose([Validators.required,ValidationService.passwordValidator])],
    });
    let params=this.activatedRoute.snapshot.params
    console.log("token",params)
    this.router.url
    if(params.token){
      this._userService.verifyUser(params.token).subscribe(res=>{
        console.log("sadfasfsdfsf",res)
      })
    }
  }
  logIn(){
    this._userService.login(this.userForm.value).subscribe(res=>{
      console.log("user authenticated",res)
    })
  }

}
