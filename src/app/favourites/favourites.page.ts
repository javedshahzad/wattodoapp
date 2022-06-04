import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {
  allFavourite: any=[];

  constructor(
    private appservice:AppService,
    private fireDB:AngularFirestore,
  ) { }

  ngOnInit() {
    this.getallFav();
  }
getallFav(){
    //,ref=>ref.where("userID","==",localStorage.getItem("uid"))
    this.appservice.startloading();
    this.fireDB.collection("favourite",ref=>ref.where("userId","==",localStorage.getItem("uid"))).valueChanges().subscribe((res:any)=>{
      if(res){
        this.allFavourite = res;
      }
      // let temp=[];
      // res.forEach(data=>{
      //   temp.push({key:data.payload.doc.id, ...data.payload.doc.data() });
      // });
      // this.allcards = temp;
       console.log(this.allFavourite)
      this.appservice.dismisloading();
    })
}
}
