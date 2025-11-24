# Voddev Website

A professional website for Voddev - App & Game Development with 3D Assets marketplace.

## Features

- Local video hosting (no YouTube required)
- User authentication system
- FBX file downloads for logged-in users
- EXE file downloads for logged-in users
- Email notifications for new user registrations
- Responsive design with modern UI

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Gmail account for email notifications

### Installation

1. Clone the repository:
```bash
git clone https://github.com/JohannesBoasDiestel/github.io.git
cd github.io
```

2. Install dependencies:
```bash
npm install
```

3. Configure email settings in `server.js`:
   - Open `server.js`
   - Find the email configuration section
   - Replace `your-email@gmail.com` with your Gmail address
   - Replace `your-app-password` with your Gmail app password
   - To get an app password:
     1. Go to Google Account settings
     2. Enable 2-factor authentication
     3. Go to Security > App passwords
     4. Generate a new app password for this application

4. Add your media files:
   - Place video files (.mp4) in `assets/videos/`
   - Place FBX files in `assets/fbx/`
   - Place EXE files in `assets/exe/`

### Running the Application

1. Start the server:
```bash
npm start
```

2. Open your browser and navigate to:
```
http://localhost:3000
```

### Development Mode

For auto-restart on file changes:
```bash
npm run dev
```

## File Structure

```
github.io/
├── assets/
│   ├── images/          # Website images
│   ├── videos/          # Local video files (.mp4)
│   ├── fbx/            # FBX files for download
│   └── exe/            # EXE files for download
├── css/
│   └── style.css       # Main stylesheet
├── js/
│   └── main.js         # Frontend JavaScript
├── index.html          # Homepage
├── login.html          # Login page
├── signup.html         # Signup page
├── dashboard.html      # User dashboard
├── server.js           # Backend server
├── package.json        # Node.js dependencies
└── README.md          # This file
```

## Features Breakdown

### 1. Local Video Hosting
- Videos are now loaded from `assets/videos/` instead of YouTube
- Simply upload your .mp4 files to the videos folder
- Update `index.html` to reference the correct filenames

### 2. User Authentication
- Secure login/signup system
- Session-based authentication
- Protected dashboard page

### 3. FBX Downloads
- Logged-in users can download FBX 3D asset files
- Files are automatically listed on the dashboard
- Shows file name and size

### 4. EXE Downloads
- Logged-in users can download game executables
- Secure download links
- Files protected behind authentication

### 5. Email Notifications
- Automatic email sent to TeranoxGames@Gmail.com when new users register
- Includes username, email, and registration timestamp

## Important Notes

### For Production Deployment

This application currently uses:
- In-memory user storage (data lost on server restart)
- Basic session management
- Local file storage

For production, consider:
1. Using a real database (MongoDB, PostgreSQL, MySQL)
2. Implementing proper password hashing (bcrypt)
3. Using environment variables for sensitive data
4. Setting up HTTPS
5. Implementing rate limiting
6. Adding file upload size limits
7. Using cloud storage for large files

### GitHub Pages Limitation

GitHub Pages only supports static websites. The backend server (server.js) **cannot** run on GitHub Pages.

To deploy this application, you need:
1. A hosting service that supports Node.js (Heroku, Vercel, DigitalOcean, AWS, etc.)
2. Deploy the backend separately
3. Update the API_URL in `js/main.js` to point to your hosted backend

Alternatively, you can use Firebase, Supabase, or similar Backend-as-a-Service platforms.

## Security Notes

- The current implementation stores passwords in plain text (development only)
- For production, implement proper password hashing
- Add input validation and sanitization
- Implement CSRF protection
- Add rate limiting to prevent abuse
- Use environment variables for sensitive configuration

## License

MIT License - feel free to use and modify as needed.
