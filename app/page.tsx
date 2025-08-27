// File: app/page.tsx
import { neon } from '@neondatabase/serverless';

export default function Page() {
  async function create(formData: FormData) {
    'use server';
    
    try {
      // Connect to the Neon database
      const sql = neon(process.env.DATABASE_URL!);
      const comment = formData.get('comment');
      
      // Validate input
      if (!comment || typeof comment !== 'string' || comment.trim().length === 0) {
        throw new Error('Comment is required and must be a non-empty string');
      }
      
      // Use parameterized query to prevent SQL injection
      await sql`INSERT INTO comments (comment) VALUES (${comment.trim()})`;
      
      // Optionally redirect or show success message
      console.log('Comment inserted successfully');
    } catch (error) {
      console.error('Error inserting comment:', error);
      throw error; // Re-throw to show error to user
    }
  }

  return (
    <form action={create}>
      <input type="text" placeholder="write a comment" name="comment" required />
      <button type="submit">Submit</button>
    </form>
  );
}