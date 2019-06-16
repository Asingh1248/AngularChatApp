import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { ChatMessage } from '../models/chat-message.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() chatMessage: ChatMessage;
  userEmail: string;
  userName: string;
  messageContent: string;
  timeStamp: Date = new Date();
  //isOwnMessage:boolean;

  constructor() { }

  ngOnInit(ChatMessage = this.chatMessage) {
    this.messageContent = this.chatMessage.message;
    this.timeStamp = this.chatMessage.timeSent;
    this.userEmail = this.chatMessage.email;
    this.userName = this.chatMessage.userName;

    //Error 5;ind name 'chatMessage'. Did you mean the instance member 'this.chatMessage'?ts(2663)
  }

}
