import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Container } from "react-bootstrap";
import AdminButton from '../components/AdminButton';
import CardPoruka from './CardPoruka';
import RightFormUsers from './RightFormUsers';
import SendMessage from './SendMessage';
import Image from 'react-bootstrap/Image';
import LogoutButton from '../components/authcomponents/LogoutButton';
import ChatButton from './ChatButton';

var clientio = require('socket.io-client');
const socket = clientio.connect('http://localhost:4000');

const ChatIndex = () => {
    const { user } = useAuth0();
    const [username, setUsername] = useState(user.nickname);
    const [slika_korisnika, setSlikaKorisnika] = useState(user.picture);
    const navigate = useNavigate();

    const date = new Date();
    const kreirana = date.toLocaleString();

    socket.emit('pristupi_sobi', { username, kreirana, slika_korisnika });

    const leaveRoom = () => {
        socket.emit('leave_room', { username });
        navigate('/', { replace: true });
    };

    return (
        <Container>
            <Card className="leftForm" onClick={() => leaveRoom()}>
                <Image className="slikaLF" src={user.picture} alt="ITAlm Logo" />
                <text className="imeLF">{user.nickname}</text>
                <AdminButton />
                <LogoutButton />
                <ChatButton />
            </Card>

            <RightFormUsers socket={socket} username={username} />
            <CardPoruka socket={socket} />
            <SendMessage socket={socket} username={username} slika_korisnika={slika_korisnika} />

            <Card.Footer className="footer">
                copyright © by ITAlm | 2022
            </Card.Footer>
        </Container>
    );

}
export default ChatIndex