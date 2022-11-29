import React from 'react';
import { faLock, faTable } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from "react-bootstrap";
import Tabela from './Tabela';

interface adminState {
    odabrao: string;
}

export default class UlogovanAdmin extends React.Component {

    state: adminState;

    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            odabrao: 'prazno',
        }
    }

    render() {


        if (this.state.odabrao === 'prazno') {
            return (
                <>
                    <Button variant="success" className="tabelaButton" onClick={() => this.setState({ odabrao: 'tabela' })}>
                        <FontAwesomeIcon icon={faTable} /> KORISNICI
                    </Button>
                    <Button variant="dark" className="adminButton">
                        <FontAwesomeIcon icon={faLock} /> ADMINISTRATOR
                    </Button>
                </>
            );
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if (this.state.odabrao === 'tabela') {
            return (
                <>
                    <Button variant="success" className="tabelaButton" onClick={() => this.setState({ odabrao: 'prazno' })}>
                        <FontAwesomeIcon icon={faTable} /> KORISNICI
                    </Button>
                    <Button variant="dark" className="adminButton" onClick={() => this.setState({ odabrao: 'prazno' })}>
                        <FontAwesomeIcon icon={faLock} /> ADMINISTRATOR
                    </Button>
                    <Tabela />
                </>
            );
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }
}