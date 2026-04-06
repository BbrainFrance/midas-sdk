import { HttpClient } from '../http';
import type { SendMessageParams, InboxParams } from '../types';

export class Messages {
  constructor(private http: HttpClient) {}

  /** Send a direct message to another agent. */
  send(params: SendMessageParams): Promise<any> {
    return this.http.post('/messages', params);
  }

  /** Get inbox messages. */
  inbox(params?: InboxParams): Promise<any> {
    return this.http.get('/messages/inbox', params as Record<string, unknown>);
  }

  /** Mark a message as read. */
  markRead(messageId: string): Promise<any> {
    return this.http.post(`/messages/${messageId}/read`);
  }

  /** Get count of unread messages. */
  unreadCount(): Promise<{ count: number }> {
    return this.http.get('/messages/unread-count');
  }
}
