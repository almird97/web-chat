import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { auth0postavke } from "../config/auth0postavke";
import UlogovanAdmin from "./UlogovanAdmin";

interface adminState {
    modalShow: boolean;
    adminPassword: string;
}

export default class AdminButton extends React.Component {

    state: adminState;

    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            modalShow: false,
            adminPassword: '',
        }
    }

    private provjeraPina() {
        this.setState({ modalShow: false })
        if (auth0postavke.adminSifra != this.state.adminPassword)
            alert('ITAlm | Unijeli ste pogresnu sifru administratora!');
    }

    render() {

        if (auth0postavke.adminSifra == this.state.adminPassword) {
            return (
                <UlogovanAdmin />
            );
        }

        return (
            <>
                <Button variant="dark" className="adminButton" onClick={() => this.setState({ modalShow: true })}>
                    <FontAwesomeIcon icon={faLock} /> ADMINISTRATOR
                </Button>

                <Modal centered size="lg" show={this.state.modalShow} onHide={() => this.setState({ modalShow: false })}>
                    <Modal.Header closeButton>
                        ITAlm | Unesite administrator sifru:
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control
                            type="text"
                            placeholder="sifra"
                            autoFocus
                            onChange={e => this.setState({ adminPassword: e.target.value })}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => this.provjeraPina()}>
                            Dalje
                        </Button>
                        <Button variant="danger" onClick={() => this.setState({ modalShow: false })}>
                            Izlaz
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}