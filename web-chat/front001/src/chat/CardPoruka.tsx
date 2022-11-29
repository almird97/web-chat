import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect, useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

const CardPoruka = ({ socket }) => {
  const [messagesRecieved, setMessagesReceived] = useState([]);
  const { user } = useAuth0();
  const [username, setUsername] = useState(user.nickname);
  const messagesColumnRef = useRef(null);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log(data);
      setMessagesReceived((state) => [
        ...state,
        {
          username: data.username,
          kreirana: data.kreirana,
          slika_korisnika: data.slika_korisnika,
          text_poruke: data.text_poruke,
        },
      ]);
    });
    return () => socket.off('receive_message');
  }, [socket]);


  useEffect(() => {
    socket.on('last_100_messages', (last100Messages) => {
      last100Messages = JSON.parse(last100Messages);
      last100Messages = sortMessagesByDate(last100Messages);
      setMessagesReceived((state) => [...last100Messages, ...state]);
    });
    return () => socket.off('last_100_messages');
  }, [socket]);


  useEffect(() => {
    messagesColumnRef.current.scrollTop =
      messagesColumnRef.current.scrollHeight;
  }, [messagesRecieved]);

  function sortMessagesByDate(messages) {
    return messages.sort(
      (a, b) => parseInt(a.kreirana) - parseInt(b.kreirana)
    );
  }

  return (
    <Container className="cardSvihPoruka" ref={messagesColumnRef}>

      {messagesRecieved.map((msg, i) => (

        <div key={i}>

          <Row>
            <Col sm={2}>
              <Image className="slikakorisnikachat" src={msg.slika_korisnika} alt="ITAlm Logo" />
            </Col>
            <Col sm={10}>
              <Row>
                <div className="message2red">
                  <p style={{ fontWeight: 'bold', fontSize: '17px' }}>{msg.username}</p>
                  <p>{msg.kreirana}</p>
                </div>
              </Row>
              <Row>
                <div className="message3red" style={{ backgroundColor: `${msg.username === username ? 'rgb(117, 0, 92, 0.200)' : 'rgb(0, 6, 117, 0.200)'}` }}>
                  <p>{msg.text_poruke}</p>
                </div>
              </Row>
            </Col>
          </Row>

        </div>
      ))
      }
    </Container >
  );


  /*   <Row>
       <Col sm={2}>

         <div className="message1red">
           <Image className="slikakorisnikachat" src={msg.slika_korisnika} alt="ITAlm Logo" />
         </div>

       </Col>
       <Col sm={10}>
         <div className="message2red">
           <p style={{ fontWeight: 'bold', fontSize: '19px' }}>{msg.username}</p>
           <p>{msg.kreirana}</p>
         </div>
         <div className="message3red" style={{ backgroundColor: `${msg.username === username ? 'rgb(117, 0, 92, 0.200)' : 'rgb(0, 6, 117, 0.200)'}` }}>
       <p>{msg.text_poruke}</p>
     </div>
       </Col>
     </Row>


*/

  /* <div className="message" style={{
          backgroundColor: `${msg.username === username ? 'rgb(141, 0, 108)' : 'rgb(0, 40, 141)'}`,
        }} key={i}>*/


  /* return (
     <div className="messagesColumn" ref={messagesColumnRef}>
       {messagesRecieved.map((msg, i) => (
         <div className="message" style={{
           backgroundColor: `${msg.username === username ? 'rgb(141, 0, 108)' : 'rgb(0, 40, 141)'}`,
         }} key={i}>
           <div style={{ display: 'flex', justifyContent: 'space-between' }}>
 
 
             <span className="msgMeta">{msg.username}</span>
             <span className="msgMeta">
               {msg.kreirana}
           
             <Image className="slikadva" src={msg.slika_korisnika} alt="ITAlm Logo" />
             </span>
           </div>
           <p className="msgText">{msg.text_poruke}</p>
           <br />
         </div>
       ))}
     </div>
   );*/
};

export default CardPoruka;