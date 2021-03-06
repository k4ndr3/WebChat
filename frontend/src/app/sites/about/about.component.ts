import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.less']
})
export class AboutComponent implements OnInit {

  welcome:string = "Welcome to my:chats";
  credit:string = "this software is brought to you by jonathan & andré";
  projectType:string = "IT Schule Stuttgart School Project";

  constructor() { }

  ngOnInit(): void {
  }

}
