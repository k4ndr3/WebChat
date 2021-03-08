import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.less']
})
export class ChatDialogComponent implements OnInit {
  
  name:string ="Peter"

  constructor() { }

  ngOnInit(): void {
  }

}
