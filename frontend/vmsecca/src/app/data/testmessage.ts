import { MessageModel } from "../models/Message";

export const testMessage: MessageModel = {
    id: 'noid',
    content: 'nocontent',
    sender: 'system',
    timestamp: new Date(),
    status: 'failed'
  }
