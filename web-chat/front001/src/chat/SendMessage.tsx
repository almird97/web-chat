import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const SendMessage = ({ socket, username, slika_korisnika }) => {
  const [text_poruke, setMessage] = useState('');

  const sendMessage = () => {
    if (text_poruke !== '') {

      const date = new Date();
      const kreirana = date.toLocaleString();

      socket.emit('send_message', { username, kreirana, slika_korisnika, text_poruke });
      setMessage('');
    }
  };

  return (
    <>
      <Form.Control className='upisisvanjePoruke'
        type="text"
        placeholder="poruka..."
        autoFocus
        onChange={(e) => setMessage(e.target.value)}
        value={text_poruke}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            sendMessage();
          }
        }}
      />
      <Button className='buttonSendPoruku' onClick={sendMessage}>
        POSALJI PORUKU
      </Button>
    </>
  );
};

export default SendMessage;