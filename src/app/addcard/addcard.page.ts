import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-addcard',
  templateUrl: './addcard.page.html',
  styleUrls: ['./addcard.page.scss'],
})
export class AddcardPage implements OnInit {
  imageUrl: any;
  public addcardform: FormGroup;
  constructor(
    private formbuilder: FormBuilder,
    private appservice:AppService,
    private fireDB:AngularFirestore,
    private nav:NavController,
    private storage: AngularFireStorage,
  ) { }

  ngOnInit() {
    this.addcardform = this.formbuilder.group({
      cardname: [null, Validators.compose([Validators.required])],
      description:[null, Validators.compose([Validators.required,])],
      price: [null, Validators.compose([Validators.required])],
      location:[null, Validators.compose([Validators.required])],
      category:[null, Validators.compose([Validators.required])],
    });
  }
  uploadFile(event) : void {
    let file = event.target.files[0];
    // console.log(file);
    this.appservice.startloading();
      let ref = this.storage.ref('uploads/' + file.name);
      ref.put(file).then(res=>{
        // console.log(res)
        ref.getDownloadURL().subscribe(url =>{
          this.imageUrl= url;
          console.log(this.imageUrl);
          this.appservice.dismisloading();
          this.appservice.toast("Image Uploaded");
       
        });
      }).catch(err=>{
        console.log(err);
      })
  }
  addcard(){
    if(this.addcardform.valid){
      console.log(this.addcardform.value);
      this.appservice.startloading();
      this.fireDB.collection('cards').add({
          'userId':localStorage.getItem('uid'),
          'cardname':this.addcardform.value.cardname,
          'description':this.addcardform.value.description,
          'price':this.addcardform.value.price,
          'location':this.addcardform.value.location,
          'category':this.addcardform.value.category,
          'imageUrl':this.imageUrl,
          'createdAt':Date.now()
      }).then((data)=>{
        this.fireDB.collection('cards').doc(data.id).update({
          'cardId':data.id
        })
        this.appservice.dismisloading();
        console.log(data);
        this.appservice.toast("Card added successfull");
        this.nav.navigateForward('home');

      })
    }
  }
}
