from flask import Flask, render_template, request, redirect, url_for, jsonify, send_file
import json
from datetime import datetime
import markdown2
import re
import io

app = Flask(__name__)

# Загрузка заметок из файла
def load_notes():
    try:
        with open('notes.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []

# Сохранение заметок в файл
def save_notes(notes):
    with open('notes.json', 'w', encoding='utf-8') as f:
        json.dump(notes, f, ensure_ascii=False, indent=2)

# Извлечение тегов из текста
def extract_tags(content):
    return re.findall(r'#(\w+)', content)

# Форматирование даты
def format_datetime(dt_str):
    dt = datetime.fromisoformat(dt_str)
    return dt.strftime("%d.%m.%Y %H:%M")

@app.template_filter('format_datetime')
def format_datetime_filter(dt_str):
    return format_datetime(dt_str)

@app.route('/')
def index():
    notes = load_notes()
    search = request.args.get('search', '').lower()
    sort = request.args.get('sort', 'desc')
    category = request.args.get('category', '')
    tag = request.args.get('tag', '')
    show_archived = request.args.get('archived', 'false').lower() == 'true'

    # Фильтрация
    if search:
        notes = [n for n in notes if search in n['title'].lower() or search in n['content'].lower()]
    if category:
        notes = [n for n in notes if n.get('category') == category]
    if tag:
        notes = [n for n in notes if tag in n.get('tags', [])]
    
    # Фильтрация по архиву
    notes = [n for n in notes if n.get('archived', False) == show_archived]

    # Сортировка
    notes.sort(key=lambda x: x['created_at'], reverse=(sort == 'desc'))

    # Подготовка данных для отображения
    all_notes = load_notes()  # Загружаем все заметки для списков категорий и тегов
    categories = sorted(set(n['category'] for n in all_notes if n.get('category')))
    all_tags = set()
    for note in all_notes:
        all_tags.update(note.get('tags', []))
    
    # Преобразование даты и времени
    for note in notes:
        note['created_at'] = format_datetime(note['created_at'])
        if note.get('updated_at'):
            note['updated_at'] = format_datetime(note['updated_at'])

    return render_template('index.html', 
                         notes=notes,
                         categories=categories,
                         tags=sorted(all_tags),
                         current_category=category,
                         current_tag=tag,
                         show_archived=show_archived)

@app.route('/add_note', methods=['POST'])
def add_note():
    notes = load_notes()
    title = request.form.get('title')
    content = request.form.get('content')
    category = request.form.get('category')
    
    if not title or not content:
        return redirect(url_for('index'))
    
    note = {
        'id': len(notes),
        'title': title,
        'content': content,
        'category': category,
        'tags': extract_tags(content),
        'created_at': datetime.now().isoformat(),
        'archived': False
    }
    
    notes.append(note)
    save_notes(notes)
    return redirect(url_for('index'))

@app.route('/edit_note/<int:note_id>', methods=['POST'])
def edit_note(note_id):
    notes = load_notes()
    note = next((n for n in notes if n['id'] == note_id), None)
    
    if note:
        note['title'] = request.form.get('title')
        note['content'] = request.form.get('content')
        note['category'] = request.form.get('category')
        note['tags'] = extract_tags(request.form.get('content'))
        note['updated_at'] = datetime.now().isoformat()
        save_notes(notes)
    
    return redirect(url_for('index'))

@app.route('/delete_note/<int:note_id>', methods=['POST'])
def delete_note(note_id):
    notes = load_notes()
    notes = [n for n in notes if n['id'] != note_id]
    save_notes(notes)
    return redirect(url_for('index'))

@app.route('/toggle_archive/<int:note_id>', methods=['POST'])
def toggle_archive(note_id):
    notes = load_notes()
    note = next((n for n in notes if n['id'] == note_id), None)
    
    if note:
        note['archived'] = not note.get('archived', False)
        save_notes(notes)
    
    return redirect(url_for('index'))

@app.route('/export_notes')
def export_notes():
    notes = load_notes()
    json_str = json.dumps(notes, ensure_ascii=False, indent=2)
    return send_file(
        io.BytesIO(json_str.encode('utf-8')),
        mimetype='application/json',
        as_attachment=True,
        download_name='notes.json'
    )

@app.route('/import_notes', methods=['POST'])
def import_notes():
    if 'file' not in request.files:
        return redirect(url_for('index'))
    
    file = request.files['file']
    if file.filename == '':
        return redirect(url_for('index'))
    
    if file and file.filename.endswith('.json'):
        try:
            new_notes = json.loads(file.read().decode('utf-8'))
            current_notes = load_notes()
            
            # Обновляем ID для новых заметок
            max_id = max((n['id'] for n in current_notes), default=-1)
            for note in new_notes:
                max_id += 1
                note['id'] = max_id
            
            current_notes.extend(new_notes)
            save_notes(current_notes)
        except (json.JSONDecodeError, UnicodeDecodeError):
            pass
    
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
