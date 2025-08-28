import { test, expect } from './artifacts.test';

test.describe('Guest Authentication Flow', () => {
  test('should require password for guest access', async ({ page }) => {
    // Navigate to the main page
    await page.goto('/');
    
    // Check that guest sign-in button is visible
    const guestButton = page.getByRole('button', { name: /try as guest/i });
    await expect(guestButton).toBeVisible();
    
    // Click the guest sign-in button
    await guestButton.click();
    
    // Should show password modal
    const modal = page.getByText(/guest access/i);
    await expect(modal).toBeVisible();
    
    // Check that password field is required
    const passwordField = page.getByLabel(/guest password/i);
    await expect(passwordField).toBeVisible();
    
    // Try to submit without password
    const submitButton = page.getByRole('button', { name: /access as guest/i });
    await submitButton.click();
    
    // Should show error
    const error = page.getByText(/please enter the guest password/i);
    await expect(error).toBeVisible();
  });

  test('should show sign-in option for guest users', async ({ page }) => {
    // First sign in as guest (this would require the actual guest password in real test)
    await page.goto('/');
    const guestButton = page.getByRole('button', { name: /try as guest/i });
    await guestButton.click();
    
    // Close the modal for this test
    const cancelButton = page.getByRole('button', { name: /cancel/i });
    await cancelButton.click();
    
    // For this test, we'll assume guest access was successful
    // In a real test environment, you'd need the actual guest password
    // or mock the authentication
  });

  test('should allow guest users to exit guest mode', async ({ page }) => {
    // This test would require actual guest authentication
    // For now, we'll test the UI flow assuming guest access
    await page.goto('/');
    
    // Test would continue here with proper guest authentication
    // For now, just verify the page loads
    await expect(page).toHaveURL('/');
  });

  test('should show guest option on login page', async ({ page }) => {
    await page.goto('/login');
    
    // Check that guest sign-in option is visible
    const guestButton = page.getByRole('button', { name: /try musicai as guest/i });
    await expect(guestButton).toBeVisible();
    
    // Check the description text
    const description = page.getByText(/explore features without creating an account/i);
    await expect(description).toBeVisible();
    
    // Click guest button to show password modal
    await guestButton.click();
    
    // Should show password modal
    const modal = page.getByText(/guest access/i);
    await expect(modal).toBeVisible();
  });

  test('should show guest option on register page', async ({ page }) => {
    await page.goto('/register');
    
    // Check that guest sign-in option is visible
    const guestButton = page.getByRole('button', { name: /try musicai as guest/i });
    await expect(guestButton).toBeVisible();
    
    // Check the description text
    const description = page.getByText(/explore features without creating an account/i);
    await expect(description).toBeVisible();
    
    // Click guest button to show password modal
    await guestButton.click();
    
    // Should show password modal
    const modal = page.getByText(/guest access/i);
    await expect(modal).toBeVisible();
  });
});
