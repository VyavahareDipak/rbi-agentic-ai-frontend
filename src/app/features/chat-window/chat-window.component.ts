import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Interfaces to strongly type our dynamic data
export interface Kpi {
  title: string;
  value: string;
  trendText: string;
  trendType: 'up' | 'down' | 'alert';
  isWarning?: boolean;
}

export interface ReferenceDoc {
  title: string;
  ref: string;
  link: string;
}

export interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
  confidence?: number;
  processTime?: string;
  kpis?: Kpi[];
  sqlQueryHtml?: string; // Storing as HTML to keep syntax highlighting
  referenceDoc?: ReferenceDoc;
}

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements AfterViewChecked {
  @ViewChild('chatScrollContainer') private chatContainer!: ElementRef;
  
  userInput: string = '';
  
  // Initial state based on your design
  messages: Message[] = [
    {
      id: '1',
      role: 'user',
      text: 'Show me a breakdown of ATM-related complaints from the last 30 days. Highlight banks with more than 15% increase in escalations and check if this correlates with any recent RBI circulars regarding ATM uptime.'
    },
    {
      id: '2',
      role: 'ai',
      text: 'Analysis complete. I\'ve identified a significant spike in ATM "Cash-out" complaints across 3 Tier-1 banks. This correlates with the non-compliance observed regarding <a href="#" style="color: #3B82F6; text-decoration: underline;">RBI/2021-22/84</a>.',
      confidence: 98.4,
      processTime: '1.4s',
      kpis: [
        { title: 'TOTAL COMPLAINTS', value: '12,402', trendText: '↗ +8.2% vs prev. month', trendType: 'up' },
        { title: 'AVG. RESOLUTION', value: '4.2 Days', trendText: '↘ -0.5 Days improvement', trendType: 'down' },
        { title: 'ESCALATION RATE', value: '18.4%', trendText: '! Critical threshold met', trendType: 'alert', isWarning: true }
      ],
      sqlQueryHtml: `<span class="sql-keyword">SELECT</span> bank_name, <span class="sql-func">COUNT</span>(*) <span class="sql-keyword">as</span> escalation_count,
(<span class="sql-func">COUNT</span>(*) * 100.0 / <span class="sql-func">SUM</span>(<span class="sql-func">COUNT</span>(*)) <span class="sql-keyword">OVER</span>()) <span class="sql-keyword">as</span> percent_of_total
<span class="sql-keyword">FROM</span> complaints_db.atm_logs
<span class="sql-keyword">WHERE</span> status = <span class="sql-string">'ESCALATED'</span> <span class="sql-keyword">AND</span> timestamp >= <span class="sql-func">NOW</span>() - <span class="sql-keyword">INTERVAL</span> <span class="sql-string">'30 days'</span>
<span class="sql-keyword">GROUP BY</span> bank_name
<span class="sql-keyword">HAVING</span> (escalation_count > (<span class="sql-keyword">SELECT</span> avg_escalations * 1.15 <span class="sql-keyword">FROM</span> historical_baselines))`,
      referenceDoc: {
        title: 'RBI Circular: Monitoring of Availability of Cash in ATMs',
        ref: 'Ref: RBI/2021-22/84 DCM(Admin)No.S1005/18.03.011/2021-22',
        link: '#'
      }
    }
  ];

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    // Push user message
    this.messages.push({
      id: Date.now().toString(),
      role: 'user',
      text: this.userInput
    });

    const currentInput = this.userInput;
    this.userInput = ''; // Clear input

    // Simulate AI loading/response (Replace this with your actual API call)
    setTimeout(() => {
      this.messages.push({
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: `Retrieving data for: "${currentInput}". Database connection simulated successfully.`,
        confidence: 95.0,
        processTime: '0.8s'
      });
    }, 1500);
  }

  setSuggestion(text: string) {
    this.userInput = text;
  }
}