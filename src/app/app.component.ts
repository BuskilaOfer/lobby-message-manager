// import {Component, HostListener, OnInit} from '@angular/core';
// import {HttpClient, HttpParams} from "@angular/common/http";

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements  OnInit {
//   title = 'antiPhishing';
//   public innerWidth: any;
//   public innerHeight: any;
//   public result : string | undefined;

//   constructor(private  http: HttpClient) {

//   }
//   @HostListener('window:resize', ['$event'])
//   onResize() {
//     this.innerWidth = window.innerWidth;
//     this.innerHeight = window.innerHeight
//   }
//   ngOnInit(): void {
//     this.innerWidth = window.innerWidth;
//     this.innerHeight = window.innerHeight
//   }


//   isPhishing(){
//     // let params = {"body": 'sdfsdf'}
//     let params = new HttpParams();
//     params = params.append('url', 'sfd');

//     this.http.get('https://flask-anti-phishing.herokuapp.com/analyzeMessageFromAPI/?msg=', {params :params}).subscribe(response=>{
//       // let re = JSON.stringify( response);
//       var jsonResponse = JSON.parse(JSON.stringify(response));
//       console.log(jsonResponse)
//        let percentage= jsonResponse['percentage'];
//        let recommended = jsonResponse['additionalRecommendation'];
//        let smiley = percentage > 50 ? ':(' : ':)'
//       this.result ="The message is " +  percentage +"%" + ' phishing ' + smiley + '\n' + recommended;
//     })

//   }

//   return() {
//     this.result =undefined;
//   }
// }

import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Ng2LoadingSpinnerModule } from 'ng2-loading-spinner'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showSpinner: any;
  title = 'antiPhishing';
  public innerWidth: any;
  public innerHeight: any;
  public result: string | undefined;
  public recommendedActions: string | undefined;
  public msg = " ";

  constructor(private http: HttpClient) {

  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight
  }
  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight
  }


  isPhishing() {
    // let params = {"body": 'sdfsdf'}
    this.showSpinner = true;
    let params = new HttpParams();
    params = params.append('msg', this.msg);

    this.http.get('http://127.0.0.1:5000/analyzeMessageFromAPI/', { params: params }).subscribe(response => {
      // let re = JSON.stringify( response);
      this.showSpinner = false;
      var jsonResponse = JSON.parse(JSON.stringify(response));
      let percentage = jsonResponse['percentage'];
      this.recommendedActions = jsonResponse['additionalRecommendation'];
      let smiley = percentage > 50 ? ':(' : ':)'
      this.result = "The message is " + percentage + "%" + ' phishing ' + smiley;
    })

  }

  return() {
    this.result = undefined;
  }


  // onEdit(event: Event) {
  //   this.msg = event.target.value;
  // }

}

