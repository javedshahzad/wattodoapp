import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  allcards:any=[];
  isSearch:boolean=false;
  searchdata: any=[];
  filterTerm: any;
  searchedData: any=[];
  maximum:any="";
  minimum:any="";

  constructor(
    private appservice:AppService,
    private fireDB:AngularFirestore,
  ) {
    this.getallcards();
  }

  getallcards(){
    //,ref=>ref.where("userID","==",localStorage.getItem("uid"))
    this.appservice.startloading();
    this.fireDB.collection("cards").valueChanges().subscribe((res:any)=>{
      if(res){
        this.searchdata=res;
        this.allcards = res;
      }
      // let temp=[];
      // res.forEach(data=>{
      //   temp.push({key:data.payload.doc.id, ...data.payload.doc.data() });
      // });
      // this.allcards = temp;
       console.log(this.allcards)
      this.appservice.dismisloading();
    })
  }
  onSwipeLeft(event,item){
    if(item.favouriteId){
      console.log(item);
      console.log("Left event");
      this.removeFavourite(item)
    }else{
      this.appservice.toast('This card is not added in favourite. Please add it to remove');
    }
  }
  onSwipeRight(event,item){
  if(item.favouriteId){
    this.appservice.toast('This card already added in favourites');
  }else{
    console.log(item);
    console.log("right event");
    this.addFavourite(item);
  }
  }

  addFavourite(item){
    this.appservice.startloading();
    this.fireDB.collection('favourite').add({
        'userId':localStorage.getItem('uid'),
        'cardname':item.cardname,
        'description':item.description,
        'price':item.price,
        'location':item.location,
        'category':item.category,
        'imageUrl':item.imageUrl,
        'cardId':item.cardId,
        'createdAt':Date.now()
    }).then((data)=>{
      this.fireDB.collection('cards').doc(item.cardId).update({
        'favouriteId':data.id
      });
      this.fireDB.collection('favourite').doc(data.id).update({
        'favouriteId':data.id
      });
      this.appservice.dismisloading();
      console.log(data);
      this.appservice.toast("Added to FAavourites successfull");

    })

  }
  removeFavourite(item){
    this.fireDB.collection('favourite').doc(item.favouriteId).delete();
    this.fireDB.collection('cards').doc(item.cardId).update({
      'favouriteId':""
    });
    this.appservice.toast("Removed from Favourite")
  }
  applyfilter(){
    this.isSearch = !this.isSearch;
  }

  searchData(){
    if(this.filterTerm){
      const str=this.filterTerm;
      console.log(str.toUpperCase())
    const arrdata=this.searchdata;
    //let x = arrdata.filter((a)=>{if(a.title==str2){return a}});
    const x =arrdata.filter((a)=>a.location.toUpperCase().includes(str.toUpperCase()) || a.category.toUpperCase().includes(str.toUpperCase()) || a.cardname.toUpperCase().includes(str.toUpperCase()));
    console.log(x);
    this.searchedData=x;
    if(this.searchedData.length !== 0){
      this.allcards=this.searchedData;
    }else{
      this.allcards=x;
      this.appservice.toast('Data not Found!');
    }
    console.log(this.allcards);
    }else{
      this.appservice.toast('Please enter name,location,category to search');
      this.getallcards();
    }

  }
  searchDataPrice(){
    if(this.maximum && this.minimum){
      const max=this.maximum;
      const min=this.minimum;
      console.log(max)
    const arrdata=this.searchdata;
    //let x = arrdata.filter((a)=>{if(a.title==str2){return a}});
    const x =arrdata.filter((a)=> a.price >= min && a.price <=max);
    console.log(x);
    this.searchedData=x;
    if(this.searchedData.length !== 0){
      this.allcards=this.searchedData;
    }else{
      this.allcards=x;
      this.appservice.toast('Data not Found!');
    }
    }
     else if(this.minimum){
      const str=this.minimum;
      console.log(str)
    const arrdata=this.searchdata;
    //let x = arrdata.filter((a)=>{if(a.title==str2){return a}});
    const x =arrdata.filter((a)=> a.price >= str );
    console.log(x);
    this.searchedData=x;
    if(this.searchedData.length !== 0){
      this.allcards=this.searchedData;
    }else{
      this.allcards=x;
      this.appservice.toast('Data not Found!');
    }
    }else if(this.maximum){
      const str=this.maximum;
      console.log(str)
    const arrdata=this.searchdata;
    //let x = arrdata.filter((a)=>{if(a.title==str2){return a}});
    const x =arrdata.filter((a)=> a.price <= str );
    console.log(x);
    this.searchedData=x;
    if(this.searchedData.length !== 0){
      this.allcards=this.searchedData;
    }else{
      this.allcards=x;
      this.appservice.toast('Data not Found!');
    }
    }

  }
}

