import type { WebhookPayload } from '../types';

const WEBHOOK_URLS = {
  new_sale: 'https://hook.us2.make.com/g4mryufycqict443pp7qen3ojmmk3uzb',
  one_week_followup: 'https://hook.us2.make.com/g4mryufycqict443pp7qen3ojmmk3uzb',
  two_week_followup: 'https://hook.us2.make.com/g4mryufycqict443pp7qen3ojmmk3uzb',
  one_month_followup: 'https://hook.us2.make.com/g4mryufycqict443pp7qen3ojmmk3uzb',
  two_months_followup: 'https://hook.us2.make.com/g4mryufycqict443pp7qen3ojmmk3uzb',
  three_months_followup: 'https://hook.us2.make.com/g4mryufycqict443pp7qen3ojmmk3uzb',
  six_months_followup: 'https://hook.us2.make.com/g4mryufycqict443pp7qen3ojmmk3uzb',
  one_year_followup: 'https://hook.us2.make.com/g4mryufycqict443pp7qen3ojmmk3uzb',
  birthday_followup: 'https://hook.us2.make.com/g4mryufycqict443pp7qen3ojmmk3uzb',
  christmas_followup: 'https://hook.us2.make.com/g4mryufycqict443pp7qen3ojmmk3uzb',
  new_years_followup: 'https://hook.us2.make.com/g4mryufycqict443pp7qen3ojmmk3uzb',
  thanksgiving_followup: 'https://hook.us2.make.com/g4mryufycqict443pp7qen3ojmmk3uzb',
  customer_message: 'https://hook.us2.make.com/a9rgjzjbal3xfxysnbpngyyjeu7moh1h',
};

export const sendWebhookPlaceholder = async (
  payload: WebhookPayload,
  triggerType?: string
): Promise<any> => {
  console.log('Webhook Triggered:', payload);

  let webhookUrl = '';

  if (triggerType && triggerType in WEBHOOK_URLS) {
    webhookUrl = WEBHOOK_URLS[triggerType as keyof typeof WEBHOOK_URLS];
  } else {
    webhookUrl = import.meta.env.VITE_WEBHOOK_URL || '';
  }

  if (!webhookUrl) {
    console.log('No webhook URL configured for trigger type:', triggerType);
    return null;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.warn(`Webhook returned status ${response.status}`);
      return null;
    }

    const data = await response.json();
    console.log('Webhook response:', data);
    return data;
  } catch (error) {
    console.error('Webhook request failed:', error);
    return null;
  }
};

export const formatDateForWebhook = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const calculateTimeSincePurchase = (purchaseDate: Date): string => {
  const now = new Date();
  const diff = Math.floor((now.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'Today';
  if (diff === 1) return '1 day ago';
  return `${diff} days ago`;
};
