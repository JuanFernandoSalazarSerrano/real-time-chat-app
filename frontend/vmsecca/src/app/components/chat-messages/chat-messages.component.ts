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

  // Safe color palette using Tailwind 300 colors (bright enough for black background)
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

  ngAfterViewChecked(): void {
    this.scrollToBottom()
  }

  private scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight
      }
    } catch (err) {
      console.error("Scroll error:", err)
    }
  }
}
