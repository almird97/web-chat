import { useAuth0 } from '@auth0/auth0-react';
import { faCashRegister } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from "react-bootstrap";


const RegisterButton = () => {
    const { isAuthenticated, loginWithPopup } = useAuth0()

    return (
        !isAuthenticated &&
        <Button variant="success" className="startButtons" onClick={() => loginWithPopup()}>
            <FontAwesomeIcon icon={faCashRegister} />  REGISTRUJ SE
        </Button>
    );

}
export default RegisterButton