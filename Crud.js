const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

let books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
  { id: 3, title: '1984', author: 'George Orwell' },
];

app.use(bodyParser.json());
app.use(cors());

app.get('/books', (req, res) => {
  res.json(books);
});

app.post('/books', (req, res) => {
  const { title, author } = req.body;
  const id = books.length + 1;
  const newBook = { id, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;
  const bookIndex = books.findIndex((book) => book.id === id);
  if (bookIndex === -1) {
    res.status(404).json({ message: `Book with ID ${id} not found` });
  } else {
    const updatedBook = { id, title, author };
    books[bookIndex] = updatedBook;
    res.json(updatedBook);
  }
});

app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex((book) => book.id === id);
  if (bookIndex === -1) {
    res.status(404).json({ message: `Book with ID ${id} not found` });
  } else {
    books.splice(bookIndex, 1);
    res.status(204).send();
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});