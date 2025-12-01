import { Component, Input, Output, EventEmitter, signal, OnInit, effect } from "@angular/core"
import { CommonModule } from "@angular/common"
import { SharingData } from "../../services/sharing-data"

@Component({
  selector: "app-chat-header",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./chat-header.component.html",
})
export class ChatHeaderComponent {

  @Input() sender = signal<string>('a');
  @Input() isConnected = false
  @Output() toggleConnection = new EventEmitter<void>()

  constructor(private readonly SharingDataService: SharingData){

  effect(() => {
    console.log('sender changed:', this.SharingDataService.sender());
    this.sender.set(this.SharingDataService.sender());
    }
  );
}

  currentTime = new Date()


  onDisconnect(): void {
    this.toggleConnection.emit()
  }
}
