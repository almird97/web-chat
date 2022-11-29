const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const bazaSpremiPoruku = require('./mysqlhosting/sacuvaj-poruku');
const bazaPreuzmiPoruku = require('./mysqlhosting/preuzmi-poruku');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

let allUsers = [];
const CHAT_BOT = 'ITAlm';

io.on('connection', (socket) => {

  ////////////////////////////////////////////////////////////////////////////////

  socket.on('pristupi_sobi', (data) => {
    const { username, kreirana, slika_korisnika } = data;

    socket.join();

    allUsers.push({ id: socket.id, username });
    socket.to().emit('trenutni_korisnici', allUsers);
    socket.emit('trenutni_korisnici', allUsers);

    socket.to().emit('receive_message', {
      text_poruke: `${username} se pridruzio razgovoru!`,
      username: CHAT_BOT,
      kreirana: data.kreirana,
      slika_korisnika: data.slika_korisnika,
    });

    socket.emit('receive_message', {
      text_poruke: `Dobro dosao ${username}...`,
      username: CHAT_BOT,
      kreirana: data.kreirana,
      slika_korisnika: data.slika_korisnika,
    });

    bazaPreuzmiPoruku()
      .then((last100Messages) => {
        socket.emit('last_100_messages', last100Messages);
      })
      .catch((err) => console.log(err));
  });

  ////////////////////////////////////////////////////////////////////////////////

  socket.on('disconnect', () => {
    const user = allUsers.find((user) => user.id == socket.id);
    if (user?.username) {

      allUsers = allUsers.filter((user) => user.id != socket.id);

      socket.to().emit('trenutni_korisnici', allUsers);
      socket.to().emit('receive_message', {
        text_poruke: `${user.username} je napustio dopisivanje...`,
        username: CHAT_BOT,
        slika_korisnika: 'https://i.ibb.co/T0MFCJR/logo.png',
      });
    }
  });

  ////////////////////////////////////////////////////////////////////////////////

  socket.on('leave_room', (data) => {
    const { username } = data;
    socket.leave();

    allUsers = allUsers.filter((user) => user.id != socket.id);

    socket.to().emit('trenutni_korisnici', allUsers);
    socket.to().emit('receive_message', {
      text_poruke: `${username} je napustio dopisivanje...`,
      username: CHAT_BOT,
      slika_korisnika: 'https://i.ibb.co/T0MFCJR/logo.png',
    });
  });

  ////////////////////////////////////////////////////////////////////////////////

  socket.on('send_message', (data) => {
    const { username, kreirana, slika_korisnika, text_poruke } = data;

    io.in().emit('receive_message', data);
    bazaSpremiPoruku(text_poruke, username, slika_korisnika, kreirana)
      .then()
      .catch((err) => console.log(err));
  });

  ////////////////////////////////////////////////////////////////////////////////
});

server.listen(4000, () => 'Server is running on port 4000');