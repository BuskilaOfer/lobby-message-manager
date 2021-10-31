import {Component, HostListener, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {
  title = 'antiPhishing';
  public innerWidth: any;
  public innerHeight: any;
  public result : string | undefined;

  constructor(private  http: HttpClient) {

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


  isPhishing(){
    // let params = {"body": 'sdfsdf'}
    let params = new HttpParams();
    params = params.append('url', 'sfd');

    this.http.get('https://flask-anti-phishing.herokuapp.com/analyzeMessageFromAPI/?msg=', {params :params}).subscribe(response=>{
      // let re = JSON.stringify( response);
      var jsonResponse = JSON.parse(JSON.stringify(response));
      console.log(jsonResponse)
       let percentage= jsonResponse['percentage'];
       let recommended = jsonResponse['additionalRecommendation'];
       let smiley = percentage > 50 ? ':(' : ':)'
      this.result ="The message is " +  percentage +"%" + ' phishing ' + smiley + '\n' + recommended;
    })

  }

  return() {
    this.result =undefined;
  }
}

