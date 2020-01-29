import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, Form } from '@angular/forms';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userForm:any;
  constructor(private formBuilder:FormBuilder,private _userService:UserService) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
      password: ['', Validators.compose([Validators.required,ValidationService.passwordValidator])],
      confirm_password:['',Validators.compose([Validators.required,ValidationService.confirmPasswordValidator.bind(this)])], 
    });
  }
  saveUser(){
    console.log("save user",this.userForm.value)
    this._userService.createUser(this.userForm.value).subscribe(res=>{
      console.log("user created",res)
    })
  }
  // password(formGroup: FormGroup) {
  //   const { value: password } = formGroup.get('password');
  //   const { value: confirmPassword } = formGroup.get('confirm_password');
  //   return password === confirmPassword ? null : { passwordNotMatch: true };
  // }
}
