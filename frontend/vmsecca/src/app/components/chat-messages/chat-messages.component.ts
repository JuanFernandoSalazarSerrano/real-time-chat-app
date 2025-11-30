import { Component, Input, type ElementRef, ViewChild, type AfterViewChecked } from "@angular/core"
import { CommonModule } from "@angular/common"
import { MessageModel } from "../../models/Message"

@Component({
  selector: "app-chat-messages",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./chat-messages.component.html",
})
export class ChatMessagesComponent implements AfterViewChecked {
  @Input() messages: MessageModel[] = []
  @Input() isTyping = false
  @ViewChild("messagesContainer") private messagesContainer!: ElementRef

  ngAfterViewChecked(): void {
    this.scrollToBottom()
  }

  private scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight
      }
    } catch (err) {
      console.error("[v0] Scroll error:", err)
    }
  }
}
