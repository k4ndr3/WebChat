import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mychats',
  templateUrl: './mychats.component.html',
  styleUrls: ['./mychats.component.less']
})
export class MychatsComponent implements OnInit {

  welcome:string = "Welcome to my:chats";

  constructor() { }

  ngOnInit(): void {
  }

}
