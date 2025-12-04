import { Component, Output, EventEmitter, Input, signal } from "@angular/core"
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

  messageContent = signal<string>("")

  onSend(): void {

    const content = this.messageContent().trim() // clean for trailing

    if (content && !this.disabled) {
      this.sendMessage.emit(content)
      this.messageContent.set("")
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
}
