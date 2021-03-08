import { Component, OnInit } from '@angular/core';
import { Messages } from '../../shared/models/messages.data'
import { DataserviceService } from '../../shared/services/dataservice.service'

@Component({
  selector: 'app-mychats',
  templateUrl: './mychats.component.html',
  styleUrls: ['./mychats.component.less']
})
export class MychatsComponent implements OnInit {

  welcome:string = "Welcome to my:chats";
  messages:Messages[]=[];
  idUser:number

  constructor(private dataService: DataserviceService) { }

  ngOnInit(): void {
    this.messages=[{user:'Paul', message:'hello', time:'14:30'},{user:'Paul', message:'how are you', time:'14:35'}]
  }

  async getMessages() {
    // this.messages = await (await this.dataService.getMessagesFromUser(this.idUser));
  }

}
