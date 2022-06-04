import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private nav:NavController,
    private menu:MenuController,
    private auth:AngularFireAuth,
  ) {
    if(localStorage.getItem('uid')){
      this.nav.navigateForward('home');
    }else{
      this.nav.navigateRoot('userco')
    }
  }
  navigate(url){
    this.nav.navigateForward(url);
    this.menu.close();
  }
  logout(){
    this.auth.signOut().then((data)=>{
      console.log(data);
      localStorage.clear();
      this.menu.close();
      this.nav.navigateRoot('userco');
    })
  }
}
