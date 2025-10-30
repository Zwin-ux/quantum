# New Features

## Backend Integration (Vercel)

### Signal Gallery
- View signals from other users in real-time
- 8x8 mini-grid previews of collapsed wave functions
- Displays signal hash and time ago
- Auto-refreshes to show latest signals

### Global Statistics
- Total signals generated
- Total observations made
- Unique visitor count
- System uptime tracking

### API Endpoints

**`/api/signals`**
- `GET`: Retrieve recent signals (limit parameter)
- `POST`: Store new signal with hash and pattern

**`/api/stats`**
- `GET`: Retrieve global statistics
- `POST`: Track events (signal, observation, interaction)

### Client Features
- Automatic signal storage after wave function collapse
- Event tracking for analytics
- Visitor ID generation and persistence
- Graceful fallback if backend unavailable

## Technical Details

**Storage**: In-memory (100 signal limit)
**CORS**: Enabled for cross-origin requests
**Rate Limiting**: None (add if needed)
**Database**: None required (can upgrade to Vercel KV/Postgres)

## Future Enhancements

- Persistent storage (Vercel KV/Postgres)
- Real-time WebSocket updates
- Signal search by hash
- User profiles and authentication
- Pattern similarity matching
- Export signals as images
