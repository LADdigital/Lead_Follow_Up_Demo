import type { BackgroundActivity, TriggerType, DemoContext } from '../types';
import type { Lead } from './leadGenerator';

export const generateTriggerBackgroundActivity = (
  triggerType: TriggerType,
  context: DemoContext
): BackgroundActivity => {
  const actions: string[] = [];

  const triggerLabels: Record<TriggerType, string> = {
    new_sale: 'New sale follow-up',
    one_week_followup: 'One week check-in',
    two_week_followup: 'Two week check-in',
    one_month_followup: 'One month check-in',
    two_months_followup: 'Two months check-in',
    three_months_followup: 'Three months check-in',
    six_months_followup: 'Six months check-in',
    one_year_followup: 'One year anniversary',
    birthday_followup: 'Birthday follow-up',
    christmas_followup: 'Christmas follow-up',
    new_years_followup: "New Year's follow-up",
    thanksgiving_followup: 'Thanksgiving follow-up',
  };

  actions.push(`Trigger detected: ${triggerLabels[triggerType]}`);
  actions.push(`Channel selected: ${context.channel}`);
  actions.push(`Identity applied: Dealership assistant (${context.salesperson})`);

  if (triggerType === 'new_sale') {
    actions.push('Rule applied: Post-purchase engagement protocol');
    actions.push('Sales momentum action: Satisfaction check initiated');
  } else if (triggerType.includes('followup')) {
    actions.push('Rule applied: Scheduled touchpoint protocol');
    actions.push('Customer retention action: Relationship maintenance');
  } else if (triggerType.includes('birthday') || triggerType.includes('christmas') || triggerType.includes('thanksgiving') || triggerType.includes('new_years')) {
    actions.push('Rule applied: Special occasion engagement');
    actions.push('Customer retention action: Personalized celebration outreach');
  }

  return { actions };
};

export const generateLeadBackgroundActivity = (
  lead: Lead,
  isInitial: boolean
): BackgroundActivity => {
  const actions: string[] = [];

  const sourceLabels: Record<string, string> = {
    website: 'Website',
    cargurus: 'CarGurus',
    autotrader: 'AutoTrader',
    kbb_ico: 'KBB ICO',
    existing_customer: 'Existing Customer',
  };

  if (isInitial) {
    actions.push(`Lead source detected: ${sourceLabels[lead.lead_source] || lead.lead_source}`);

    if (lead.vehicle_of_interest && lead.vehicle_of_interest !== 'N/A') {
      actions.push('Intent classified: Vehicle availability inquiry');
    }

    actions.push('Identity applied: Dealership assistant (Adelyn)');
    actions.push('Rule applied: Mandatory Response Triad');

    if (lead.lead_source === 'kbb_ico' || lead.kbb_offer) {
      actions.push('Buy Center routing: Trade appraisal path');
    } else {
      actions.push('Sales momentum action: Trade-in path introduced');
    }

    actions.push('Conversation phase: Initial contact');
  } else {
    actions.push('Conversation phase: Follow-up engagement');
    actions.push('Identity applied: Dealership assistant (Adelyn)');
    actions.push('Rule applied: Mandatory Response Triad');
    actions.push('Sales momentum action: Appointment positioning');
  }

  return { actions };
};

export const generateManualModeBackgroundActivity = (
  context: DemoContext,
  isCustomerMessage: boolean
): BackgroundActivity => {
  const actions: string[] = [];

  if (!isCustomerMessage) {
    actions.push('Mode: Manual response');
    actions.push(`Identity applied: Dealership assistant (${context.salesperson})`);
    actions.push('Rule applied: Conversational continuity protocol');
    actions.push('Sales momentum action: Engagement maintenance');
  }

  return { actions };
};

export const generateAutomatedLoopBackgroundActivity = (
  context: DemoContext,
  isCustomerGenerated: boolean
): BackgroundActivity => {
  const actions: string[] = [];

  if (isCustomerGenerated) {
    actions.push('Simulated customer response generated');
    actions.push('Personality profile: Realistic dealership customer');
  } else {
    actions.push('Mode: Automated conversation flow');
    actions.push(`Identity applied: Dealership assistant (${context.salesperson})`);
    actions.push('Rule applied: Conversational continuity protocol');
    actions.push('Sales momentum action: Engagement progression');
  }

  return { actions };
};
