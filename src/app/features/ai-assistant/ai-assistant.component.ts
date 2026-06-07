import { Component } from '@angular/core';
import { ChatWindowComponent } from '../chat-window/chat-window.component';
import { AgentActivityComponent } from '../agent-activity/agent-activity.component';

@Component({
  selector: 'app-ai-assistant',
  imports: [ChatWindowComponent,AgentActivityComponent],
  templateUrl: './ai-assistant.component.html',
  styleUrl: './ai-assistant.component.css'
})
export class AiAssistantComponent {

}
