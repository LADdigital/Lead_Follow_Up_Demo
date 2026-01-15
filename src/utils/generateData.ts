
const FIRST_NAMES = [
  'James', 'Michael', 'David', 'Robert', 'Sarah', 'Jessica', 'Jennifer', 'Lisa',
  'Daniel', 'Christopher', 'Emily', 'Amanda', 'Michelle', 'Lauren', 'John',
  'Mark', 'Anthony', 'Donald', 'Maria', 'Sandra', 'Ashley', 'Katherine',
  'Richard', 'Thomas', 'Brian', 'Charles', 'Karen', 'Nancy', 'Betty',
];

const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
  'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
];

const SUBARU_MODELS = [
  'Outback',
  'Forester',
  'Crosstrek',
  'Ascent',
  'Legacy',
];

const TRIMS = [
  'Base',
  'Premium',
  'Limited',
  'Touring',
  'Wilderness',
];

const COLORS = [
  'Pearl White',
  'Magnetite Gray',
  'Deep Sea Blue',
  'Autumn Green',
  'Abyss Blue',
  'Crystal Black',
];

const SALESPERSON_NAMES = [
  'Dylan',
  'Mat in the Hat',
  'Martin',
  'Erik',
  'Juan the only Juan',
  'Shelly',
  'Darrell',
  'Chad GPT',
];

function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateSessionId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function generateRandomCustomer(daysAgoRange: { min: number; max: number }, scenarioType: 'recent_purchase' | 'csi_window') {
  const firstName = randomElement(FIRST_NAMES);
  const lastName = randomElement(LAST_NAMES);
  const model = randomElement(SUBARU_MODELS);
  const trim = randomElement(TRIMS);
  const color = randomElement(COLORS);
  const salesperson = randomElement(SALESPERSON_NAMES);

  const daysAgo = randomInt(daysAgoRange.min, daysAgoRange.max);
  const purchaseDate = new Date();
  purchaseDate.setDate(purchaseDate.getDate() - daysAgo);
  purchaseDate.setHours(9 + randomInt(0, 6), randomInt(0, 59), 0, 0);

  const timeSincePurchase =
    daysAgo === 1 ? '1 day ago' : `${daysAgo} days ago`;

  return {
    customerName: `${firstName} ${lastName}`,
    vehicle: `2025 Subaru ${model} ${trim}, ${color}`,
    purchaseDate,
    salesperson,
    timeSincePurchase,
    vehicleType: 'NEW',
    scenarioType,
  };
}

export function formatDateForWebhook(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function calculateTimeSincePurchase(purchaseDate: Date): string {
  const now = new Date();
  const diff = Math.floor((now.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'Today';
  if (diff === 1) return '1 day ago';
  return `${diff} days ago`;
}
