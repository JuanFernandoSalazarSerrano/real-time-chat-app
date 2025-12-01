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

  isTyping = signal<boolean>(false)


  constructor(private readonly SharingDataService: SharingData) {}

  ngOnInit(): void {

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

        // subscribe to chat event

        this.client.subscribe('/topic/message', (event) => {

          let message: MessageModel = JSON.parse(event.body) as MessageModel;
          // this.listOfMessages.set([...this.listOfMessages(), message])
          console.log(event)
          this.listOfMessages().push(message)

        }) //broker recieves this message and sends it to all the connected users


      };

      this.client.onDisconnect = (frames) => {
        console.log('Disonnected: ' + !this.client.connected + ':' + frames);
        this.isConnected.set(false);
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


  /* ALL THE FUNCTIONS RELATED TO MESSAGES */


  onSendMessage(messageContent: string): void {

    this.message().type = 'NEW_MESSAGE'
    this.client.publish({ destination: '/app/message', body: JSON.stringify({ text: messageContent }) });

  }

  private allertBrokerNewUser() {
    this.message().type = 'NEW_USER_CONNECTION';
    this.client.publish({ destination: '/app/message', body: JSON.stringify({ text: this.SharingDataService.sender() }) });
  }



    //   messages = signal<MessageModel[]>([
  //   {
  //     id: "1",
  //     content: "SECURE CHANNEL ESTABLISHED. AWAITING INSTRUCTIONS.",
  //     sender: "agent",
  //     timestamp: new Date(Date.now() - 300000),
  //     status: "read",
  //   },
  //   {
  //     id: "2",
  //     content: "Status report requested.",
  //     sender: "user",
  //     timestamp: new Date(Date.now() - 240000),
  //     status: "delivered",
  //   },
  //   {
  //     id: "3",
  //     content: "ALL SYSTEMS OPERATIONAL. READY FOR DEPLOYMENT.",
  //     sender: "agent",
  //     timestamp: new Date(Date.now() - 180000),
  //     status: "read",
  //   },
  // ])


  //   this.messages.update((msgs) => [...msgs, newMessage])

  //   // Simulate agent typing and response
  //   this.isTyping.set(true)
  //   setTimeout(() => {
  //     this.isTyping.set(false)
  //     const agentResponse: MessageModel = {
  //       id: (Date.now() + 1).toString(),
  //       content: "MESSAGE RECEIVED. PROCESSING REQUEST...",
  //       sender: "agent",
  //       timestamp: new Date(),
  //       status: "read",
  //     }
  //     this.messages.update((msgs) => [...msgs, agentResponse])
  //   }, 2000)
  // }

}
