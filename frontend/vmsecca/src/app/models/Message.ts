export class MessageModel {
  text: string = ''
  date: number = Date.now()
  sender: string = ''
  type: string = 'NEW_USER_CONNECTION';
}

