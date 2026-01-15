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

const MAKES = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 'Subaru', 'Hyundai', 'Mazda', 'Volkswagen', 'Kia'];
const MODELS = ['Camry', 'Accord', 'F-150', 'Silverado', 'Altima', 'Outback', 'Elantra', 'CX-5', 'Jetta', 'Forte'];
const TRIMS = ['Base', 'LX', 'EX', 'Limited', 'Premium', 'Sport', 'Touring'];
const COLORS = ['White', 'Black', 'Silver', 'Gray', 'Blue', 'Red', 'Green'];

const WEBSITE_MESSAGES = [
  'Is this still available?',
  'Can you tell me more about this one?',
  'Interested in this vehicle, what\'s the next step?',
  'Would like to schedule a test drive',
  'Is this vehicle in stock?',
  'Can I get more details on this?',
];

const THIRD_PARTY_MESSAGES = [
  'Checking availability',
  'Is this still available?',
  'Interested in this vehicle',
  'Would like more information',
];

function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateEmail(firstName: string, lastName: string): string {
  const providers = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
  const formats = [
    `${firstName.toLowerCase()}.${lastName.toLowerCase()}`,
    `${firstName.toLowerCase()}${lastName.toLowerCase()}`,
    `${firstName.toLowerCase()}${randomInt(1, 99)}`,
  ];
  return `${randomElement(formats)}@${randomElement(providers)}`;
}

function generatePhone(): string {
  const areaCode = randomInt(200, 999);
  const exchange = randomInt(200, 999);
  const number = randomInt(1000, 9999);
  return `(${areaCode}) ${exchange}-${number}`;
}

function generateStockNumber(): string {
  const prefix = randomElement(['SU', 'VH', 'NW', 'US']);
  const number = randomInt(10000, 99999);
  return `${prefix}${number}`;
}

export interface Lead {
  lead_source: 'website' | 'kbb_ico' | 'cargurus' | 'autotrader';
  channel: string;
  preferred_contact_method: 'SMS' | 'EMAIL';
  customer_name: string;
  email: string;
  phone: string;
  vehicle_of_interest: string;
  message: string;
  kbb_offer?: {
    customer: {
      name: string;
      phone: string;
      email: string;
    };
    vehicle: {
      year: number;
      make: string;
      model: string;
      trim: string;
      color: string;
      mileage: number;
    };
    offer_amount: number;
  };
}

export function generateWebsiteFormLead(): Lead {
  const firstName = randomElement(FIRST_NAMES);
  const lastName = randomElement(LAST_NAMES);
  const year = randomInt(2020, 2025);
  const make = randomElement(MAKES);
  const model = randomElement(MODELS);
  const includeStock = Math.random() > 0.5;

  return {
    lead_source: 'website',
    channel: 'Website',
    preferred_contact_method: Math.random() > 0.5 ? 'EMAIL' : 'SMS',
    customer_name: `${firstName} ${lastName}`,
    email: generateEmail(firstName, lastName),
    phone: generatePhone(),
    vehicle_of_interest: `${year} ${make} ${model}${includeStock ? ` (Stock #${generateStockNumber()})` : ''}`,
    message: randomElement(WEBSITE_MESSAGES),
  };
}

export function generateKBBICOLead(): Lead {
  const firstName = randomElement(FIRST_NAMES);
  const lastName = randomElement(LAST_NAMES);
  const year = randomInt(2015, 2022);
  const make = randomElement(MAKES);
  const model = randomElement(MODELS);
  const trim = randomElement(TRIMS);
  const color = randomElement(COLORS);
  const mileage = randomInt(20000, 120000);
  const baseValue = 25000 - (2024 - year) * 2000 - (mileage / 10000) * 500;
  const offerAmount = Math.max(5000, Math.floor(baseValue + randomInt(-2000, 2000)));

  return {
    lead_source: 'kbb_ico',
    channel: 'KBB ICO',
    preferred_contact_method: Math.random() > 0.5 ? 'EMAIL' : 'SMS',
    customer_name: `${firstName} ${lastName}`,
    email: generateEmail(firstName, lastName),
    phone: generatePhone(),
    vehicle_of_interest: 'N/A',
    message: 'Customer completed Instant Cash Offer and is looking to sell their vehicle.',
    kbb_offer: {
      customer: {
        name: `${firstName} ${lastName}`,
        phone: generatePhone(),
        email: generateEmail(firstName, lastName),
      },
      vehicle: {
        year,
        make,
        model,
        trim,
        color,
        mileage,
      },
      offer_amount: offerAmount,
    },
  };
}

export function generateCarGurusLead(): Lead {
  const firstName = randomElement(FIRST_NAMES);
  const lastName = randomElement(LAST_NAMES);
  const year = randomInt(2020, 2025);
  const make = randomElement(MAKES);
  const model = randomElement(MODELS);

  return {
    lead_source: 'cargurus',
    channel: 'CarGurus',
    preferred_contact_method: Math.random() > 0.5 ? 'EMAIL' : 'SMS',
    customer_name: `${firstName} ${lastName}`,
    email: generateEmail(firstName, lastName),
    phone: generatePhone(),
    vehicle_of_interest: `${year} ${make} ${model} (Stock #${generateStockNumber()})`,
    message: randomElement(THIRD_PARTY_MESSAGES),
  };
}

export function generateAutoTraderLead(): Lead {
  const firstName = randomElement(FIRST_NAMES);
  const lastName = randomElement(LAST_NAMES);
  const year = randomInt(2020, 2025);
  const make = randomElement(MAKES);
  const model = randomElement(MODELS);

  return {
    lead_source: 'autotrader',
    channel: 'AutoTrader',
    preferred_contact_method: Math.random() > 0.5 ? 'EMAIL' : 'SMS',
    customer_name: `${firstName} ${lastName}`,
    email: generateEmail(firstName, lastName),
    phone: generatePhone(),
    vehicle_of_interest: `${year} ${make} ${model} (Stock #${generateStockNumber()})`,
    message: randomElement(THIRD_PARTY_MESSAGES),
  };
}

export type LeadSource = 'website' | 'kbb_ico' | 'cargurus' | 'autotrader';

export function generateLead(source: LeadSource): Lead {
  switch (source) {
    case 'website':
      return generateWebsiteFormLead();
    case 'kbb_ico':
      return generateKBBICOLead();
    case 'cargurus':
      return generateCarGurusLead();
    case 'autotrader':
      return generateAutoTraderLead();
  }
}
