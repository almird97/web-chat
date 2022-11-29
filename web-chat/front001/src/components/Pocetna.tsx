import { useAuth0 } from '@auth0/auth0-react';
import { Card, Container } from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import AdminButton from './AdminButton';
import LoginButton from './authcomponents/LoginButton';
import LogoutButton from './authcomponents/LogoutButton';
import RegisterButton from './authcomponents/Register';
import ChatButton from '../chat/ChatButton';

const Pocetna = () => {
    const { isAuthenticated, user, isLoading } = useAuth0();

    if (isLoading) {
        return <div className="loader">Loading...</div>
    }
    if (isAuthenticated) {

        return (
            <Container>
                <Card className="leftForm">
                    <Image className="slikaLF" src={user.picture} alt="ITAlm Logo" onClick={() => window.location.reload()} />
                    <text className="imeLF">{user.nickname}</text>
                    <AdminButton />
                    <LogoutButton />
                    <ChatButton />
                </Card>
                <Card.Footer className="footer">
                    copyright © by ITAlm | 2022
                </Card.Footer>
            </Container>
        );
    }
    else {
        return (
            <Container>
                <Card className="slika">
                    <Image src={require('../css/logo2.png')} alt="ITAlm Logo" onClick={() => window.location.reload()} />
                </Card>
                <Card className="formaPocetna">
                    <LoginButton />
                    <RegisterButton />
                </Card>
                <Card.Footer className="footer">
                    copyright © by ITAlm | 2022
                </Card.Footer>
            </Container>
        );
    }

}
export default Pocetna