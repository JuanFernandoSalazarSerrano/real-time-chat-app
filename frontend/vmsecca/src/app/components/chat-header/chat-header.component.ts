import { Component, Input, Output, EventEmitter } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-chat-header",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./chat-header.component.html",
})
export class ChatHeaderComponent {
  @Input() isConnected = false
  @Output() toggleConnection = new EventEmitter<void>()

  currentTime = new Date()

  ngOnInit(): void {
    // Update time every second
    setInterval(() => {
      this.currentTime = new Date()
    }, 1000)
  }

  onDisconnect(): void {
    this.toggleConnection.emit()
  }
}
