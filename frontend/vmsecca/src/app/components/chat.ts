import { SharingData } from './../services/sharing-data';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Client } from '@stomp/stompjs';
import SocksJS from 'sockjs-client';
import { URL_WEBSOCKET } from './env';
import { CommonModule } from "@angular/common"
import { ChatHeaderComponent } from './chat-header/chat-header.component';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { ChatMessagesComponent } from './chat-messages/chat-messages.component';
import { MessageModel } from '../models/Message';
import { testMessage } from '../data/testmessage';
import { AES } from 'crypto-ts';

@Component({
  selector: 'app-chat',
  imports: [FormsModule, CommonModule, ChatHeaderComponent,ChatInputComponent, ChatMessagesComponent],
  templateUrl: './chat.html',
  styleUrls: ["../../styles.css"],
})

export class Chat implements OnInit {

  private client: Client = new Client();

  readonly isConnected = signal<boolean>(false)

  message = signal<MessageModel>(testMessage)

  listOfMessages = signal<MessageModel[]>([])

  isTyping = signal<string>('')

  username = signal<string>('')


  constructor(private readonly SharingDataService: SharingData) {

    this.username.set(SharingDataService.sender());

  }

  ngOnInit(): void {

    // start of the handshake for WebSocket/SockJS.
    this.client.webSocketFactory = () => {
      return new SocksJS(`${URL_WEBSOCKET}/chat-websocket`);
    }

    this.listenConnections()
    this.startConnection()


  this.client.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message'] + '\n' + frame.body);
    };
  }

  /* ALL THE FUNCTIONS RELATED TO CONNECTIONS */

  listenConnections() {
    // frame object contains all the information of our connection with our broker
    try {

      this.client.onConnect = (frames) => {
        console.log('Powered: ' + this.client.connected + ':' + frames);
        this.isConnected.set(true);

        // send message to broker onConnect to all users of new user connection to the chat
        this.allertBrokerNewUser();

        // subscribe to chat event, broker recieves this message ->  sends it to all the connected users
        this.client.subscribe('/topic/message', (event) => {

          const messageFromEvent: MessageModel = JSON.parse(event.body) as MessageModel; // other name could be messageFromeSpringboot

          //We want to work with our angular version of the message, not with what springboot directly gives us, so:
          // this.message.set(messageFromEvent);

          // assign color to new user (the message of the new user)
          if(messageFromEvent.type == 'NEW_USER_CONNECTION'
            && this.SharingDataService.sender() == messageFromEvent.sender){

              this.message.set({...this.message(), color: messageFromEvent.color})
            }

          // push to the messages list
          this.listOfMessages.set([...this.listOfMessages(), messageFromEvent])
        }
      )

      this.client.subscribe('/topic/typing', (event) => {

        const messageFromEvent: MessageModel = JSON.parse(event.body) as MessageModel; // other name could be messageFromeSpringboot

        this.isTyping.set(event.body);
        this.SharingDataService.sender.set(messageFromEvent.sender);
        setTimeout(() => {this.isTyping.set('')}, 4000)

      })

      this.client.subscribe(`/topic/messageHistory/${this.username()}`, (event) => {
        const history = JSON.parse(event.body) as MessageModel[]
        this.listOfMessages.set(history.reverse())
      })

      this.client.publish({destination: '/app/messageHistory', body: this.username()})

      };

      this.client.onDisconnect = (frames) => {
        console.log('Disonnected: ' + !this.client.connected + ':' + frames);
        this.isConnected.set(false);
        this.message.set(testMessage);
        this.listOfMessages.set([]);
      };

    } catch (error) {
      console.error('Error in connection:', error);
    }
  }


  startConnection(){
    try {
      this.client.activate();
      this.onToggleConnection()
    } catch (error) {
        console.error('Error activating client:', error);
    }
  }

  stopConnection(){
    try {
      this.client.deactivate();
      this.onToggleConnection()
    } catch (error) {
        console.error('Error deactivating client:', error, 'We strongly recommend turning off the machine');
    }
  }

  onToggleConnection(): void {
    this.isConnected.update((status) => !status)
  }

  /* ALL THE FUNCTIONS RELATED TO MESSAGES OR SENDING MESSAGES TO THE BROKER */

  onSendMessage(messageContent: string): void {
    const encrypted = AES.encrypt(messageContent, 'secret key 123').toString();
    this.message().text = encrypted
    this.message().type = 'NEW_MESSAGE'
    this.client.publish({ destination: '/app/message', body: JSON.stringify(this.message())});
  }

  private allertBrokerNewUser(): void {
    this.message.set({...this.message(), sender: this.SharingDataService.sender()})
    this.message().type = 'NEW_USER_CONNECTION';
    this.client.publish({ destination: '/app/message', body: JSON.stringify(this.message())});
  }

  allertBrokerUserTyping(): void{
    this.client.publish({ destination: '/app/typing', body: JSON.stringify(this.message())});
  }
}
