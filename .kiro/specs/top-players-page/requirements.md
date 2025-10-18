# Requirements Document

## Introduction

This feature adds a new `/top-players` page to the Dota 2 statistics application that displays the top-ranked players from the OpenDota API. The page will reuse the existing table UI pattern from the `/id` page but fetch and display data from the `https://api.opendota.com/api/topPlayers` endpoint. This provides users with a quick view of the highest-ranked players in the Dota 2 community, including their rankings, names, and Steam IDs, with the ability to navigate to individual player profiles.

## Requirements

### Requirement 1: Top Players Page Route

**User Story:** As a user, I want to access a dedicated page at `/top-players`, so that I can view the highest-ranked Dota 2 players.

#### Acceptance Criteria

1. WHEN a user navigates to `/top-players` THEN the system SHALL display a page with the top players table
2. WHEN the page loads THEN the system SHALL fetch data from the OpenDota API endpoint `https://api.opendota.com/api/topPlayers`
3. IF the API request fails THEN the system SHALL display an appropriate error message to the user
4. WHEN the page is accessed THEN the system SHALL use the same container layout and styling as the existing `/id` page

### Requirement 2: Top Players Data Display

**User Story:** As a user, I want to see top players displayed in a table format similar to the `/id` page, so that I have a consistent and familiar user experience.

#### Acceptance Criteria

1. WHEN the top players data is loaded THEN the system SHALL display it in a Card component with proper spacing
2. WHEN displaying the table THEN the system SHALL include columns for: rank number, player name, Steam ID, and actions
3. WHEN rendering player names THEN the system SHALL display the `name` field from the API response
4. WHEN rendering Steam IDs THEN the system SHALL display the `account_id` field from the API response in monospace font
5. WHEN displaying the rank THEN the system SHALL show the player's position in the list (1, 2, 3, etc.)
6. WHEN the table is rendered THEN the system SHALL include a badge showing the total count of players displayed
7. WHEN the page title is displayed THEN the system SHALL show "Top Players" or similar descriptive text

### Requirement 3: Player Profile Navigation

**User Story:** As a user, I want to click on a player in the top players table to view their detailed profile, so that I can learn more about specific players.

#### Acceptance Criteria

1. WHEN a user views the top players table THEN each row SHALL include a "View Profile" link in the actions column
2. WHEN a user clicks "View Profile" THEN the system SHALL navigate to `/id/[account_id]` where `[account_id]` is the player's account ID
3. WHEN the link is rendered THEN it SHALL use the same styling as the existing `/id` page links
4. WHEN a user hovers over the link THEN the system SHALL provide appropriate visual feedback

### Requirement 4: API Integration and Type Safety

**User Story:** As a developer, I want proper TypeScript types for the top players API response, so that the code is type-safe and maintainable.

#### Acceptance Criteria

1. WHEN implementing the API integration THEN the system SHALL define a TypeScript type for the top players API response
2. WHEN the API response is received THEN the system SHALL include at minimum: `account_id`, `name`, and `rank` fields
3. WHEN adding API methods THEN the system SHALL extend the existing `OpenDotaAPI` class in `lib/opendota-api.ts`
4. WHEN implementing the fetch method THEN the system SHALL use the existing `fetchWithRetry` pattern for consistency and error handling
5. WHEN types are defined THEN they SHALL be added to `lib/types.ts` alongside existing type definitions

### Requirement 5: Loading and Error States

**User Story:** As a user, I want to see appropriate feedback when the page is loading or if an error occurs, so that I understand the current state of the application.

#### Acceptance Criteria

1. WHEN the page is loading data THEN the system SHALL display a loading indicator or skeleton UI
2. WHEN an API error occurs THEN the system SHALL display a user-friendly error message
3. WHEN the API returns an empty array THEN the system SHALL display a message indicating no players are available
4. WHEN a rate limit error occurs THEN the system SHALL display a specific message about rate limiting
5. IF the data fails to load THEN the system SHALL provide an option to retry the request

### Requirement 6: Accessibility and Code Quality

**User Story:** As a user with accessibility needs, I want the top players page to follow accessibility best practices, so that I can navigate and use the page effectively.

#### Acceptance Criteria

1. WHEN rendering table elements THEN the system SHALL use semantic HTML with proper TableHeader and TableBody components
2. WHEN displaying interactive elements THEN they SHALL be keyboard accessible
3. WHEN implementing the feature THEN the code SHALL follow all Ultracite linting rules
4. WHEN writing code THEN it SHALL use TypeScript strict mode and avoid `any` types
5. WHEN creating links THEN they SHALL have appropriate accessible text for screen readers
6. WHEN the page renders THEN all interactive elements SHALL have proper focus states
