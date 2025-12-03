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

  @Input() sender = signal<string>('');
  @Input() isConnected = false
  @Input() color: string = 'red';
  @Output() toggleConnection = new EventEmitter<void>()

    private readonly SAFE_COLORS: { [key: string]: string } = {
    'red': '#ef4444',
    'orange': '#f97316',
    'amber': '#f59e0b',
    'yellow': '#eab308',
    'lime': '#84cc16',
    'green': '#22c55e',
    'emerald': '#10b981',
    'teal': '#14b8a6',
    'cyan': '#06b6d4',
    'sky': '#0ea5e9',
    'blue': '#3b82f6',
    'indigo': '#6366f1',
    'violet': '#8b5cf6',
    'purple': '#a855f7',
    'fuchsia': '#d946ef',
    'pink': '#ec4899',
    'rose': '#f43f5e',
    'slate': '#64748b',
    'neutral': '#737373',
    'stone': '#78716c'
    // zinc will be system color (the BROKER color)
  }



  getMessageColor(color?: string): string {
    if (!color) {
      return this.SAFE_COLORS['amber'] // Default to amber-300
    }

    const normalizedColor = color.toLowerCase().trim()
    return this.SAFE_COLORS[normalizedColor] || this.SAFE_COLORS['amber']
  }


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
