import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Button, Card } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';


const RightFormUsers = ({ socket, username }) => {

    const [korisnici, setKorisnici] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        socket.on('trenutni_korisnici', (data) => {
            console.log(data);
            setKorisnici(data);
        });

        return () => socket.off('trenutni_korisnici');
    }, [socket]);

    const napustiChat = () => {
        socket.emit('leave_room', { username });
        navigate('/', { replace: true });
    };

    return (
        <>
            <Card className="rightForm">

                <h5 style={{ color: 'white' }}>ONLINE KORISNICI</h5>

                <ul className="usersList">
                    {korisnici.map((user) => (
                        <li
                            style={{
                                fontWeight: `${user.username === username ? 'bold' : 'normal'}`,
                            }}
                            key={user.id}
                        >
                            {user.username}
                        </li>
                    ))}
                </ul>

            </Card>

            <Button variant="warning" className="logoutChatButton" onClick={() => napustiChat()}>
                <FontAwesomeIcon icon={faClose} /> NAPUSTI
            </Button>
        </>
    );
};

export default RightFormUsers;