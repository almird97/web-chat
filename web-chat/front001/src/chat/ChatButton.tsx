import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ChatButton = () => {

    const navigate = useNavigate();
    return (
        <Button variant="primary" className="chatButton" onClick={() => navigate('/chat', { replace: true })}>
            <FontAwesomeIcon icon={faMessage} /> CHAT
        </Button>
    );
}

export default ChatButton
