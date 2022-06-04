import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  public loginform: FormGroup;
  constructor(
    private formbuilder: FormBuilder,
    private appservice:AppService,
    private auth:AngularFireAuth,
    private nav:NavController
  ) { }

  ngOnInit() {
    this.loginform = this.formbuilder.group({
      email:[null, Validators.compose([Validators.required,])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
    });
  }
  login(){
    if(this.loginform.valid){
      console.log(this.loginform.value);
      this.appservice.startloading();
      this.auth.signInWithEmailAndPassword(this.loginform.value.email,this.loginform.value.password).then((data)=> {
        console.log(data.user.uid);
        console.log(data.user);
        this.appservice.dismisloading();
        localStorage.setItem('uid',data.user.uid);
        this.appservice.toast('Login successfull');
        this.nav.navigateForward('home');
    }).catch((error)=>{
      this.appservice.dismisloading();
      this.appservice.toast(error.message);
      
     
    })
    }
  }
}
