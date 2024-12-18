# NoteMe - Modern Note-Taking Application

> ⚠️ **Learning Project Notice**
> 
> This is a personal learning project created with enthusiasm and curiosity. While I've tried to follow best practices, there might be bugs or areas for improvement. The code could probably be structured or implemented differently - feel free to experiment and modify it to suit your needs! If you find any issues or have suggestions for improvements, they're welcome. Remember, sometimes the best way to learn is by trying different approaches and making mistakes along the way.

A modern, minimalist note-taking application built with Flask and JavaScript. Created by [asp2peaK](https://github.com/asp2peaK) as a personal project to explore web development and create an efficient note-taking solution.

## Features

- ✍️ Create and edit notes with Markdown support
- 🏷️ Organize with tags and categories
- 🔍 Powerful search functionality
- 📁 Archive system for better organization
- 🌓 Dark and light theme support
- 📤 Data backup via export/import
- 📱 Responsive design for all devices

## Technical Stack

- Backend: Python Flask
- Frontend: HTML, CSS, JavaScript
- Storage: JSON file-based system
- Templating: Jinja2
- Styling: Custom CSS with theme support

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/asp2peaK/NoteMe.git
cd NoteMe
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the application:
```bash
python app.py
```

4. Open in your browser: http://localhost:5000

## Usage Guide

- Create notes using the + button
- Add tags by using # in your note text
- Organize notes into categories
- Archive unnecessary notes with the 📥 button
- Toggle theme with 🌙/☀️ button
- Backup your data using export/import (📤/📥)

## Development Notes

This is a development version. For production use:
1. Use a production WSGI server (e.g., Gunicorn)
2. Set up proper data storage (e.g., SQLite or PostgreSQL)
3. Add user authentication
4. Configure proper security headers

Some potential improvements that could be made:
- Implement user authentication system
- Switch to a proper database (SQLite/PostgreSQL)
- Add collaborative note sharing
- Implement real-time sync
- Add rich text editing
- Enhance search with filters

## Contributing

While this is primarily a personal project, feel free to fork it and adapt it to your needs. If you find any bugs or have suggestions, feel free to open an issue or submit a pull request.

## License

This project is protected by copyright. You may use it for personal purposes, study the code, and make modifications for personal use. However, commercial use, redistribution without attribution, and claiming the work as your own are prohibited. See the [LICENSE](LICENSE) file for full terms.

## Acknowledgments

- Created by [asp2peaK](https://github.com/asp2peaK)
- Built with Flask and modern JavaScript
