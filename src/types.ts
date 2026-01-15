export type TriggerType =
  | 'new_sale'
  | 'one_week_followup'
  | 'two_week_followup'
  | 'one_month_followup'
  | 'two_months_followup'
  | 'three_months_followup'
  | 'six_months_followup'
  | 'one_year_followup'
  | 'birthday_followup'
  | 'christmas_followup'
  | 'new_years_followup'
  | 'thanksgiving_followup';

export interface BackgroundActivity {
  actions: string[];
}

export interface ChatMessage {
  id: string;
  type: 'customer' | 'assistant';
  text: string;
  timestamp: Date;
  senderName?: string;
  backgroundActivity?: BackgroundActivity;
}

export interface WebhookResponse {
  role: 'assistant' | 'customer';
  message: string;
  customer_name?: string;
}

export interface DemoContext {
  customerName: string;
  vehicle: string;
  purchaseDate: Date;
  salesperson: string;
  channel: string;
  timeSincePurchase: string;
  vehicleType: string;
  scenarioType: string;
}

export interface SystemStatus {
  ruleActivated: string;
  lastMessageTime: Date | null;
  isTyping: boolean;
}

export interface WebhookPayload {
  session_id: string;
  customer_name: string;
  salesperson: string;
  vehicle: string;
  purchase_date: string;
  time_since_purchase: string;
  vehicle_type: string;
  channel: string;
  trigger_type: string;
  scenario_type: string;
  message_text?: string;
}
