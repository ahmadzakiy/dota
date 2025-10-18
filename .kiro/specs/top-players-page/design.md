# Design Document

## Overview

The top players page feature adds a new route `/top-players` that displays the highest-ranked Dota 2 players using data from the OpenDota API. The implementation will follow the existing architectural patterns established in the codebase, reusing UI components and API utilities while extending them with new functionality specific to the top players endpoint.

The page will be a server-side rendered Next.js page that fetches data at request time, displays it in a familiar table format, and provides navigation to individual player profiles.

## Architecture

### Component Structure

```
app/
  top-players/
    page.tsx          # Main page component (Server Component)

lib/
  opendota-api.ts     # Extended with getTopPlayers method
  types.ts            # Extended with TopPlayer type
```

### Data Flow

1. User navigates to `/top-players`
2. Next.js Server Component renders `app/top-players/page.tsx`
3. Page component calls `openDotaAPI.getTopPlayers()`
4. API method fetches data from `https://api.opendota.com/api/topPlayers`
5. Data is transformed and passed to UI components
6. Table renders with player information
7. User can click "View Profile" to navigate to `/id/[account_id]`

### Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **UI Components**: Existing shadcn/ui components (Card, Table, Badge)
- **Styling**: Tailwind CSS (following existing patterns)
- **API Client**: Fetch API with retry logic (existing pattern)

## Components and Interfaces

### 1. Page Component (`app/top-players/page.tsx`)

**Type**: Next.js Server Component

**Responsibilities**:
- Fetch top players data from OpenDota API
- Handle loading and error states
- Render table UI with player data
- Provide navigation links to player profiles

**Props**: None (route component)

**Key Implementation Details**:
- Use async/await for data fetching
- Implement error boundary for graceful error handling
- Reuse existing UI components (Card, Table, Badge)
- Follow the layout pattern from `/id` page

### 2. API Extension (`lib/opendota-api.ts`)

**New Method**: `getTopPlayers()`

**Signature**:
```typescript
async getTopPlayers(): Promise<TopPlayer[]>
```

**Responsibilities**:
- Fetch data from `https://api.opendota.com/api/topPlayers`
- Use existing `fetchWithRetry` method for consistency
- Return typed array of top players
- Handle API errors appropriately

**Implementation Notes**:
- No Steam ID conversion needed (API returns account IDs directly)
- Apply standard API delay between requests
- Use existing error handling patterns

### 3. Type Definitions (`lib/types.ts`)

**New Type**: `TopPlayer`

```typescript
export type TopPlayer = {
  account_id: number
  name: string | null
  rank: number
  // Additional fields from API response
  personaname?: string
  avatar?: string
  avatarfull?: string
  loccountrycode?: string
}
```

**Rationale**:
- Matches OpenDota API response structure
- Allows for optional fields that may not always be present
- Provides type safety for the page component

## Data Models

### TopPlayer Model

Based on the OpenDota API documentation, the `/api/topPlayers` endpoint returns an array of player objects with the following structure:

```typescript
{
  account_id: number        // Player's account ID
  name: string | null       // Player's registered name (may be null)
  rank: number             // Leaderboard rank
  personaname?: string     // Steam persona name
  avatar?: string          // Small avatar URL
  avatarfull?: string      // Full-size avatar URL
  loccountrycode?: string  // Country code
}
```

### Data Transformation

No complex transformations are required. The API response can be used directly with the following considerations:

1. **Rank Display**: Use array index + 1 for display rank (1, 2, 3, etc.)
2. **Name Fallback**: Display `name` if available, otherwise fall back to `personaname` or "Unknown Player"
3. **Account ID**: Display as-is in monospace font for consistency

## Error Handling

### Error Scenarios

1. **Network Errors**
   - Retry up to 3 times with exponential backoff (existing pattern)
   - Display user-friendly error message if all retries fail
   - Message: "Failed to load top players. Please try again later."

2. **Rate Limiting (429)**
   - Display specific rate limit message
   - Message: "Rate limit exceeded. Please try again in a few minutes."

3. **API Unavailable (5xx)**
   - Display service unavailable message
   - Message: "OpenDota service is currently unavailable. Please try again later."

4. **Empty Response**
   - Display informational message
   - Message: "No top players data available at this time."

### Error UI

```typescript
// Error state rendering
if (error) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="p-6">
        <div className="text-center space-y-4">
          <p className="text-destructive">{error.message}</p>
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </Card>
    </div>
  )
}
```

## Testing Strategy

### Unit Tests

1. **API Method Tests** (`lib/opendota-api.test.ts`)
   - Test successful API response parsing
   - Test error handling for various HTTP status codes
   - Test retry logic
   - Mock fetch responses

2. **Type Safety Tests**
   - Verify TypeScript compilation with strict mode
   - Ensure no `any` types are used
   - Validate type definitions match API response

### Integration Tests

1. **Page Rendering Tests**
   - Test page renders with valid data
   - Test error state rendering
   - Test empty state rendering
   - Test navigation links are correct

2. **API Integration Tests**
   - Test actual API endpoint (with rate limiting consideration)
   - Verify response structure matches type definitions
   - Test error scenarios with mocked responses

### Manual Testing Checklist

- [ ] Navigate to `/top-players` and verify page loads
- [ ] Verify table displays player data correctly
- [ ] Click "View Profile" and verify navigation to correct player page
- [ ] Test with network throttling to verify loading states
- [ ] Test with network offline to verify error handling
- [ ] Verify accessibility with keyboard navigation
- [ ] Test with screen reader
- [ ] Verify responsive design on mobile devices
- [ ] Check browser console for errors or warnings
- [ ] Verify Ultracite linting passes with no errors

## UI/UX Considerations

### Layout

- Reuse the container layout from `/id` page for consistency
- Single Card component containing the table
- Responsive design that works on mobile and desktop

### Visual Hierarchy

1. Page title/heading
2. Player count badge
3. Table with clear column headers
4. Action links with hover states

### Accessibility

- Semantic HTML table structure
- Proper heading hierarchy
- Keyboard navigable links
- Focus indicators on interactive elements
- Screen reader friendly labels
- Sufficient color contrast

### Performance

- Server-side rendering for fast initial load
- No client-side JavaScript required for basic functionality
- Minimal bundle size impact (reusing existing components)
- Consider caching strategy for API responses (future enhancement)

## Design Decisions and Rationales

### 1. Server Component vs Client Component

**Decision**: Use Next.js Server Component

**Rationale**:
- Data fetching happens on the server, reducing client-side JavaScript
- Better SEO and initial page load performance
- Consistent with Next.js 14+ best practices
- No client-side state management needed for this use case

### 2. API Method Location

**Decision**: Extend existing `OpenDotaAPI` class

**Rationale**:
- Maintains consistency with existing API methods
- Reuses error handling and retry logic
- Keeps all OpenDota API interactions in one place
- Easier to maintain and test

### 3. Table UI Pattern

**Decision**: Reuse exact table structure from `/id` page

**Rationale**:
- Provides familiar user experience
- Reduces development time
- Maintains visual consistency across the application
- Leverages existing, tested components

### 4. No Client-Side Filtering/Sorting

**Decision**: Display data as-is from API without client-side manipulation

**Rationale**:
- API already returns data in ranked order
- Keeps implementation simple
- Reduces client-side JavaScript
- Can be enhanced later if needed

### 5. Direct Navigation to Player Profiles

**Decision**: Use standard anchor tags for navigation

**Rationale**:
- Simple and accessible
- Works without JavaScript
- Consistent with existing `/id` page pattern
- Provides browser history and back button support

## Future Enhancements

While not part of the current requirements, these enhancements could be considered for future iterations:

1. **Pagination**: Display more than the default number of players
2. **Filtering**: Filter by country or rank range
3. **Caching**: Implement API response caching to reduce load times
4. **Real-time Updates**: Periodically refresh data without page reload
5. **Player Avatars**: Display player avatars in the table
6. **Rank Badges**: Show rank tier icons alongside player names
7. **Search**: Allow users to search for specific players
8. **Export**: Allow users to export the top players list
