import { useAuth0 } from '@auth0/auth0-react';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from "react-bootstrap";

const LogoutButton = () => {
    const { isAuthenticated, logout } = useAuth0()

    return (
        isAuthenticated &&
        <Button variant="danger" className="logoutButton" onClick={() => logout()}>
            <FontAwesomeIcon icon={faSignOut} /> ODJAVI SE
        </Button>
    );

}
export default LogoutButton