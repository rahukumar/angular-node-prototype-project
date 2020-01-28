import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, Form } from '@angular/forms';
import { ValidationService } from 'src/app/shared/services/validation.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userForm:any;
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, ValidationService.emailValidator]],
      password: ['', Validators.required],
      confirm_password:['',Validators.required]
    });
  }

}
