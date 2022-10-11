import { devices } from '@playwright/test';

export default {
  projects: [
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
};
