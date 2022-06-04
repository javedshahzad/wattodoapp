import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  public signupform: FormGroup;
  constructor(
    private formbuilder: FormBuilder,
    private appservice:AppService,
    private fireDB:AngularFirestore,
    private auth:AngularFireAuth,
    private nav:NavController
  ) { }

  ngOnInit() {
    this.signupform = this.formbuilder.group({
      username: [null, Validators.compose([Validators.required])],
      email:[null, Validators.compose([Validators.required,])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      confirmpassword:[null, Validators.compose([Validators.required, Validators.minLength(5)])],
    });
  }
  signup(){
    console.log(this.signupform.value)
    if(this.signupform.valid){
      this.appservice.startloading();
      this.auth.createUserWithEmailAndPassword(this.signupform.value.email,this.signupform.value.password).then((data)=> {
        localStorage.setItem('uid',data.user.uid);
        this.fireDB.collection('users').add({
          'userId':data.user.uid,
          'username':this.signupform.value.username,
          'email':this.signupform.value.email,
          'password':this.signupform.value.password,
          'createdAt':Date.now()
        });
        data.user.sendEmailVerification();
      })
      .then(()=>{
        this.appservice.dismisloading();
        this.appservice.toast('Registration Successfull!');
        this.nav.navigateForward('login');
      })
      .catch((error)=>{
        this.appservice.dismisloading();
        this.appservice.toast(error.message);
        

        
      }) 
      .catch((error)=>{
        this.appservice.dismisloading();
        this.appservice.toast(error.message);
        
       
      })
    }
  }
}
