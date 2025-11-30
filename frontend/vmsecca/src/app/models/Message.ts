export type Sender = 'agent' | 'user' | 'system';
export type MessageStatus = 'read' | 'unread' | 'sent' | 'delivered' | 'failed';

export interface Message {
  id: string;
  content: string;
  sender: Sender;
  timestamp: Date;
  status: MessageStatus;
}


/**
 * Lightweight class wrapper for Message with helpers for creation/serialization.
 */

export class MessageModel implements Message {
  id: string;
  content: string;
  sender: Sender;
  timestamp: Date;
  status: MessageStatus;

  constructor(props: {
    id: string;
    content: string;
    sender: Sender;
    timestamp?: Date | number | string;
    status?: MessageStatus;
  }) {
    this.id = props.id;
    this.content = props.content;
    this.sender = props.sender;
    this.timestamp = props.timestamp ? new Date(props.timestamp) : new Date();
    this.status = props.status ?? 'sent';
  }

  static from(obj: Partial<Message> & { id?: string; content?: string; sender?: Sender }): MessageModel {
    if (!obj.id) throw new Error('Message requires an id');
    if (!obj.content) throw new Error('Message requires content');
    if (!obj.sender) throw new Error('Message requires a sender');
    return new MessageModel({
      id: obj.id,
      content: obj.content,
      sender: obj.sender,
      timestamp: (obj as any).timestamp,
      status: (obj as any).status,
    });
  }
}


