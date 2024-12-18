# NoteMe

A minimalist note-taking application with tags and categories support.

## Features

- ✍️ Create and edit notes
- 🏷️ Add tags (using #) and categories
- 🔍 Search through notes
- 📁 Archive functionality
- 🌓 Dark and light themes
- 📤 Export and import notes in JSON format

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/NoteMe.git
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

## Usage

- Add tags by using # in your note text
- Use categories to group related notes
- Archive unnecessary notes with the 📥 button
- Toggle theme with 🌙/☀️ button
- Export and import your notes with 📤/📥 buttons

## Technologies

- Backend: Python Flask
- Frontend: HTML, CSS, JavaScript
- Storage: JSON file
- Templating: Jinja2

## Development

This is a development version. For production use:
1. Use a production WSGI server (e.g., Gunicorn)
2. Set up proper data storage (e.g., SQLite or PostgreSQL)
3. Add user authentication
4. Configure proper security headers

## License

MIT License. Feel free to use and modify as you wish!
