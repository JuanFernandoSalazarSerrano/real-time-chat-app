import { Component, Output, EventEmitter, Input, signal, ElementRef, ViewChild } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

@Component({
  selector: "app-chat-input",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./chat-input.component.html",
})
export class ChatInputComponent {

  @Input() disabled = false
  @Output() sendMessage = new EventEmitter<string>()
  @Output() userTyping = new EventEmitter<boolean>()

  @ViewChild('messageInput') messageInput!: ElementRef<HTMLTextAreaElement>;

  messageContent = signal<string>("")

  onSend(): void {

    const content = this.messageContent().trim() // clean for trailing

    if (content && !this.disabled) {
      this.sendMessage.emit(content)
      this.messageContent.set("")
      this.adjustHeight(); // Reset height after sending
    }
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      this.onSend()
    }
  }

  typingEvent(){
    this.userTyping.emit()
  }

  adjustHeight(event?: Event): void {
    const textarea = this.messageInput.nativeElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
}
