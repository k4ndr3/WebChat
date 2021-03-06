import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {

  welcome:string = "Welcome to my:chats";

  constructor() { }

  ngOnInit(): void {
  }

}
