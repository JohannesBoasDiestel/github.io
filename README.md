# Voddev Portfolio Website

A professional portfolio website for Voddev, showcasing app and game development projects. This is a static website, suitable for hosting on services like GitHub Pages.

## Features

- **Project Showcase:** A gallery of projects with dedicated detail pages.
- **About Page:** A section to describe the individual or company.
- **Contact Page:** A simple contact form (can be integrated with services like Formspree).
- **Responsive Design:** Modern UI that works on all devices.
- **Local Video Hosting:** Host your own video files.

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/JohannesBoasDiestel/github.io.git
   cd github.io
   ```

2. **Customize the content:**
   - **`index.html`:** Update the project showcase with your own projects.
   - **`project-*.html`:** Duplicate the `project-template.html` for each of your projects and fill in the details.
   - **`about.html`:** Add your own bio and information.
   - **`contact.html`:** Update the email address and/or Formspree link.
   - **`assets/`:** Replace the images and videos with your own media.

3. **Open `index.html` in your browser:**
   - You can open the `index.html` file directly in your web browser to see the website.

## Deployment

This website is static, which means it can be deployed on any static web hosting service. GitHub Pages is a great free option.

### Deploying to GitHub Pages

1. Make sure your repository is named `your-username.github.io`.
2. Push your changes to the `main` branch.
3. Your website will be available at `https://your-username.github.io`.

## File Structure

```
github.io/
├── assets/
│   ├── images/       # Website images
│   └── videos/       # Local video files
├── css/
│   └── style.css     # Main stylesheet
├── js/
│   └── main.js       # Frontend JavaScript
├── index.html        # Homepage
├── about.html        # About page
├── contact.html      # Contact page
├── project-1.html    # Example project page
└── README.md         # This file
```

## License

MIT License - feel free to use and modify as needed.
