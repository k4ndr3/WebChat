import { Component, OnInit } from '@angular/core';
import { Messages } from '../../shared/models/messages.data'
import { DataserviceService } from '../../shared/services/dataservice.service'
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mychats',
  templateUrl: './mychats.component.html',
  styleUrls: ['./mychats.component.less']
})
export class MychatsComponent implements OnInit {

  outGoing = new FormGroup({
     outGoingMessage : new FormControl(''),
  })
 

  welcome:string = "Welcome to my:chats";
  messages:Messages[]=[];
  idUser:number
  myUserId: number;

  constructor(private dataService: DataserviceService) { }

  ngOnInit(): void {
    this.messages=[{user:'Paul', message:'hello', time:'14:30'},{user:'Paul', message:'how are you', time:'14:35'}]
  }

  async getMessages() {
    await this.dataService.getMessagesFromUser(this.idUser).subscribe(res => {
      this.messages = res;
    });
  }

  sendMessage() {
    // return this.dataService.sendMessage(this.myUserId, this.messages);
  }
}
