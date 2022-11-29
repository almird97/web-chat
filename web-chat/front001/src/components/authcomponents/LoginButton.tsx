import { useAuth0 } from '@auth0/auth0-react';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from "react-bootstrap";


const LoginButton = () => {
    const { isAuthenticated, loginWithPopup } = useAuth0()

    return (
        !isAuthenticated &&
        <Button variant="primary" className="startButtons" onClick={() => loginWithPopup()}>
            <FontAwesomeIcon icon={faSignInAlt} />  PRIJAVI SE
        </Button>
    );

}
export default LoginButton