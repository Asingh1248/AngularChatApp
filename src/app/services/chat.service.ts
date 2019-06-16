import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
//import { FirebaseListObservable } from 'angularfire2/database-deprecated';
//Error1:
import { AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

import * as firebase from 'firebase/app';

import { ChatMessage } from '../models/chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  user: any;
  chatMessages: AngularFireList<ChatMessage[]>;
  chatMessage: ChatMessage;
  userName: Observable<string>;


  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth

  ) {
    // this.afAuth.authState.subscribe(auth => {
    //   if (auth !== undefined && auth !== null) {
    //     this.user = auth;
    //   }

    // });

  }

  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    //const email = this.user.email;
    const email = 'test@example.com';
    this.chatMessages = this.getMessages();
    //Error 4:[]
    this.chatMessages.push({
      message: msg,
      // Error 3(Not Solved):error TS2345: Argument of type '{ message: string; timeSent: string; userName: Observable<string>; email: any; }' is not assignable to parameter of type 'ChatMessage[]'.
      timeSent: timestamp,

      email: email,
      userName: 'user-test',
      //userName: this.userName //subscribe it

    });
    console.log('Called SendMessage()');
  }

  //Remove []
  getMessages(): AngularFireList<ChatMessage[]> {
    //query to create our message feed binding
    console.log('Calling Get MEssages().....') 
    return this.db.list('/messages', ref => {
      let q = ref.limitToLast(25).orderByKey();
      return q;


    });
  }

  //**** */

  // getMessages(): AngularFireList<ChatMessage> {
  //   //query to create our message feed binding
  //   return this.db.list('/messages', {
  //     query:
  //     {
  //       limitToLast: 25,
  //       orderByKey: true
  //     }


  //   }).valueChanges();
  //   //  Error2: error TS2345: Argument of type '{}' is not assignable to parameter of type 'QueryFn'.
  // }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
      (now.getUTCMonth() + 1) + '/' +
      now.getUTCDate();

    const time = now.getUTCHours() + ':' +
      now.getUTCMinutes() + ':' +
      now.getUTCSeconds();

    return (date + '' + time);
  }

}
