import type { DemoContext, WebhookPayload } from '../types';
import { formatDateForWebhook } from './webhooks';

export const getEmptyContext = (): DemoContext => {
  return {
    customerName: '',
    vehicle: '',
    purchaseDate: new Date(),
    salesperson: '',
    channel: 'SMS',
    timeSincePurchase: '',
    vehicleType: '',
    scenarioType: '',
  };
};

export const generateWebhookPayload = (
  sessionId: string,
  context: DemoContext,
  triggerType: string,
  messageText?: string,
): WebhookPayload => {
  return {
    session_id: sessionId,
    customer_name: context.customerName,
    salesperson: context.salesperson,
    vehicle: context.vehicle,
    purchase_date: formatDateForWebhook(context.purchaseDate),
    time_since_purchase: context.timeSincePurchase,
    vehicle_type: context.vehicleType,
    channel: context.channel,
    trigger_type: triggerType,
    scenario_type: context.scenarioType,
    message_text: messageText,
  };
};
