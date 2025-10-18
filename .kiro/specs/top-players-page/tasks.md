
# Implementation Plan

- [x] 1. Add TypeScript type definition for TopPlayer
  - Create the `TopPlayer` type in `lib/types.ts` with fields: `account_id`, `name`, `rank`, and optional fields `personaname`, `avatar`, `avatarfull`, `loccountrycode`
  - Export the type for use in other modules
  - _Requirements: 4.1, 4.2, 4.5_

- [x] 2. Implement getTopPlayers API method
  - Add `getTopPlayers()` method to the `OpenDotaAPI` class in `lib/opendota-api.ts`
  - Use the existing `fetchWithRetry` method to fetch from `https://api.opendota.com/api/topPlayers`
  - Return a Promise that resolves to `TopPlayer[]`
  - Apply proper TypeScript typing to the method signature
  - _Requirements: 4.3, 4.4, 1.2_

- [x] 3. Create the top-players page directory and file structure
  - Create the directory `app/top-players/`
  - Create the file `app/top-players/page.tsx`
  - Set up the basic Next.js Server Component structure
  - _Requirements: 1.1, 1.4_

- [x] 4. Implement data fetching in the page component
  - Import the `openDotaAPI` instance in `app/top-players/page.tsx`
  - Call `openDotaAPI.getTopPlayers()` to fetch data
  - Implement try-catch error handling for API failures
  - Handle empty response scenario
  - _Requirements: 1.2, 1.3, 5.3_

- [x] 5. Implement error state UI
  - Create error message display for API failures
  - Add specific error message for rate limiting (429 errors)
  - Add specific error message for service unavailable (5xx errors)
  - Include retry functionality for failed requests
  - _Requirements: 1.3, 5.2, 5.4, 5.5_

- [x] 6. Implement the table UI with top players data
  - Import required UI components: Card, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Badge
  - Create Card wrapper with proper spacing and padding
  - Implement table structure with columns: rank (#), name, Steam ID (account_id), and actions
  - Display rank using array index + 1
  - Display player name with fallback to personaname or "Unknown Player"
  - Display account_id in monospace font
  - Add badge showing total player count
  - Add "Top Players" heading
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 1.4_

- [x] 7. Implement player profile navigation links
  - Add "View Profile" link in the actions column for each player row
  - Link to `/id/[account_id]` using the player's account_id
  - Apply consistent styling with existing `/id` page links
  - Ensure links have proper hover states
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [x] 8. Ensure accessibility compliance
  - Verify semantic HTML table structure with proper TableHeader and TableBody
  - Ensure all links are keyboard accessible
  - Add proper focus states to interactive elements
  - Verify accessible text for screen readers on all links
  - Test keyboard navigation through the table
  - _Requirements: 6.1, 6.2, 6.5, 6.6_

- [x] 9. Validate code quality and linting
  - Run Ultracite linter to ensure no violations
  - Verify TypeScript strict mode compliance
  - Ensure no `any` types are used
  - Fix any linting errors or warnings
  - _Requirements: 6.3, 6.4_

- [x] 10. Test the complete feature
  - Manually test navigation to `/top-players`
  - Verify table displays correctly with real API data
  - Test "View Profile" links navigate to correct player pages
  - Test error handling by simulating network failures
  - Test empty state handling
  - Verify responsive design on different screen sizes
  - Test keyboard navigation and accessibility
  - _Requirements: 1.1, 1.2, 2.1, 3.1, 5.1, 5.2, 5.3_
