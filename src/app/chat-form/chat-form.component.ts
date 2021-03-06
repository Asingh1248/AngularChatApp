import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent implements OnInit {

  message: string;

  constructor(private chat: ChatService) { }

  ngOnInit() {
  }

  send() {
    this.chat.sendMessage(this.message);
    //It Going to Bind ngModel Message Property
    this.message = '';
  }

  handleSubmit(event) {
    //KeyDwon Event
    if (event.keyCode === 13) {
      this.send();
    }

  }
}
