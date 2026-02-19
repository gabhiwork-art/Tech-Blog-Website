# Tech Tales & Tidbits

A modern, responsive blogging platform for tech stories and articles. Built with vanilla JavaScript, Tailwind CSS, and a client-side MVC architecture.

## Features

- 📝 **Write & Publish** - Create and share tech stories
- 🔍 **Explore** - Discover stories by category (AI, Web Dev, Cybersecurity, Design, Startups)
- 👥 **Community** - Follow authors, build your network
- 💾 **Save for Later** - Bookmark stories for reading later
- ❤️ **Like System** - Show appreciation for great content
- 🎨 **Dark Mode** - Comfortable reading experience
- 📊 **Stats** - Track your story performance
- 🔄 **Responsive** - Works perfectly on desktop, tablet, and mobile

## Tech Stack

- **Frontend**: Vanilla JavaScript (No frameworks)
- **Styling**: Tailwind CSS
- **Storage**: LocalStorage for client-side persistence
- **Icons**: Material Symbols
- **Fonts**: Inter (sans) & Merriweather (serif)

## Project Structure

```
google_website/
├── index.html          # Main HTML entry point
├── css/
│   └── style.css       # Custom CSS & animations
├── js/
│   ├── app.js          # Main application entry point
│   ├── config.js       # Tailwind configuration
│   ├── store.js        # Application state & data management
│   ├── router.js       # Client-side routing
│   ├── components.js   # Reusable UI components
│   └── views.js        # Page views & templates
└── README.md           # This file
```

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No build process or server required

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/google_website.git
cd google_website
```

2. Open in your browser:
```bash
# Using Python 3
python -m http.server 8000

# Or using Node.js
npx http-server

# Or simply double-click index.html (limited functionality)
```

3. Visit `http://localhost:8000` (or appropriate port)

## Usage

### First Time Setup
- Click "Get Started" on the landing page
- App initializes with seed data (sample stories & users)
- Browse stories by category
- Follow authors and like content

### Features Walkthrough

**Writing Stories**
- Click "Write" button in header
- Fill in story details (title, content, category)
- Publish to make visible to others

**Exploring Content**
- Use "Explore" tab to search stories
- Filter by category (AI, Coding, Design, etc.)
- View trending and recommended content

**Following Authors**
- Visit author profiles
- Click "Follow" to see their stories in your feed
- Manage your following list in Community tab

**Dark Mode**
- Toggle with moon/sun icon in header
- Preference saved to localStorage

## Architecture

### State Management (`store.js`)
- Centralized `Store` object manages all application state
- Persists data to browser's localStorage
- Methods for CRUD operations on stories, users, and interactions

### Routing (`router.js`)
- Client-side router handles navigation without page reloads
- URL-based state: `#page?param=value`
- Lazy rendering of components

### Components (`components.js`)
- `Header()` - Top navigation bar
- `Sidebar()` - Left navigation menu
- `RightSidebar()` - Recommendations panel
- `StoryCard()` - Story preview component

### Views (`views.js`)
- `Landing()` - Welcome/auth page
- `Home()` - Feed view with filters
- `StoryDetail()` - Full story view
- `Editor()` - Write/edit stories
- `Profile()` - User profile page
- `Followers()` - Community discovery
- `Saved()` - Bookmarked stories
- `Stats()` - Analytics dashboard
- `Search()` - Story search
- `Settings()` - User preferences

## Data Model

### Users
```javascript
{
  id: string,
  name: string,
  email: string,
  avatar: string,
  bio: string,
  followers: number,
  following: number,
  followingIds: string[],
  likedIds: string[],
  savedIds: string[]
}
```

### Stories
```javascript
{
  id: string,
  title: string,
  content: string,
  category: string,
  authorId: string,
  date: ISO8601,
  likes: number,
  views: number,
  status: 'draft' | 'published'
}
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## LocalStorage Keys

- `tt_users` - User data
- `tt_stories` - Story content
- `tt_current_user_id` - Current logged-in user
- `theme` - Dark/light mode preference

## Development

### Reset Data
Add `?reset_stories=1` or `#reset_stories=1` to URL to reset stories to seed data during development.

### Debug Mode
Check browser console for detailed logging:
```javascript
console.debug() calls in Store.toggleFollow and other methods
```

## Future Enhancements

- [ ] Backend integration (Node.js/Express)
- [ ] Database persistence (MongoDB/PostgreSQL)
- [ ] User authentication (JWT)
- [ ] Comments & discussions
- [ ] Rich text editor
- [ ] Image uploads
- [ ] Email notifications
- [ ] Analytics dashboard
- [ ] PWA support

## License

MIT License - see LICENSE file for details

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

For issues or questions, please open an issue on GitHub.

---

**Made with ❤️ by [Abhijeet Gupta](https://github.com/abhijeetgupta)**
