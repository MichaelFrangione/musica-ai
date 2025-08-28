import { generateDummyPassword } from './db/utils';

export const isProductionEnvironment = process.env.NODE_ENV === 'production';
export const isDevelopmentEnvironment = process.env.NODE_ENV === 'development';
export const isTestEnvironment = Boolean(
  process.env.PLAYWRIGHT_TEST_BASE_URL ||
    process.env.PLAYWRIGHT ||
    process.env.CI_PLAYWRIGHT,
);

export const guestRegex = /^guest-\d+$/;

// Use environment variable for guest password, fallback to generated one
export const GUEST_PASSWORD = process.env.GUEST_PASSWORD || 'musicai-guest-2024';
export const DUMMY_PASSWORD = generateDummyPassword();
