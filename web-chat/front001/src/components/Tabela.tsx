import axios from "axios";
import React from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { auth0postavke } from "../config/auth0postavke";
import UserDto from "../dtos/UserDto";
import KorisnikType from "../types/KorisnikType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faEdit, faLock, faTrash } from "@fortawesome/free-solid-svg-icons";
import Image from 'react-bootstrap/Image';

interface KorisnikState {
    korisnici: KorisnikType[];

    created_at: string;
    email: string;
    family_name: string;
    given_name: string;
    name: string;
    nickname: string;
    picture: string;
    updated_at: string;
    user_id: string;
    last_login: string;
    last_ip: string;
    logins_count: number;

    modelUredjivanjaID: string;
}

export default class Tabela extends React.Component {

    state: KorisnikState;

    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            korisnici: [],

            created_at: '',
            email: '',
            family_name: '',
            given_name: '',
            name: '',
            nickname: '',
            picture: '',
            updated_at: '',
            user_id: '',
            last_login: '',
            last_ip: '',
            logins_count: 0,

            modelUredjivanjaID: 'false',
        };
    }



    componentDidMount() {

        var infoauth = {
            method: 'GET',
            url: auth0postavke.url + 'users',
            headers: { authorization: 'Bearer ' + auth0postavke.atoken }
        };

        axios.request(infoauth)
            .then(res => {
                this.listaKorisnikaAdd(res.data);
            }).catch(function (error) {
                alert(error)
            });
    }

    private listaKorisnikaAdd(data?: UserDto[]) {
        const korisniciLista: KorisnikType[] | undefined = data?.map(korisnik => {
            return {
                user_id: korisnik.user_id,
                last_login: korisnik.last_login,
                email: korisnik.email,
                nickname: korisnik.nickname,
            };
        });
        this.setState(Object.assign(this.state, {
            korisnici: korisniciLista,
        }));
    }

    private obrisiKorisnika(id: string) {
        if (id === '') return alert('Niste odabrali ni jednog korisnika!');
        var authinfo = {
            method: 'DELETE',
            url: auth0postavke.url + 'users/' + id,
            headers: { authorization: 'Bearer ' + auth0postavke.atoken }
        };
        axios.request(authinfo)
            .then(() => {
                this.componentDidMount();
                this.setState({ modelUredjivanjaID: 'false' })
            }).catch(function (error) {
                alert(error)
            });
    }

    private infoKorisnika(id: string) {
        if (id === '') return alert('Niste odabrali ni jednog korisnika!');
        var authinfo = {
            method: 'GET',
            url: auth0postavke.url + 'users/' + id,
            headers: { authorization: 'Bearer ' + auth0postavke.atoken }
        };
        axios.request(authinfo)
            .then((res) => {
                this.setState({
                    created_at: res.data.created_ad,
                    email: res.data.email,
                    family_name: res.data.family_name,
                    given_name: res.data.given_name,
                    nickname: res.data.nickname,
                    picture: res.data.picture,
                    updated_at: res.data.updated_at,
                    user_id: res.data.user_id,
                    last_ip: res.data.last_ip,
                    last_login: res.data.last_login,
                    logins_count: res.data.logins_count,

                    modelUredjivanjaID: id,
                });
            }
            ).catch(function (error) {
                alert(error);
            });
    }

    render() {

        return (
            <>
                <Form className="formaTabele">
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>user id</th>
                                <th>korisnicko ime</th>
                                <th>e-mail adresa</th>
                                <th>posljedni login</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.korisnici.map(korisnik => (
                                <tr>
                                    <td>{korisnik.user_id}</td>
                                    <td>{korisnik.nickname}</td>
                                    <td>{korisnik.email}</td>
                                    <td>{korisnik.last_login}</td>
                                    <td>
                                        <Button className="tipkaLista" variant="primary" title="INFO" onClick={() => this.infoKorisnika(korisnik.user_id)}>
                                            <FontAwesomeIcon icon={faCircleInfo} />
                                        </Button>

                                        {
                                            korisnik.user_id.substring(0, 5) === 'auth0' ?
                                                <Button className="tipkaLista" title="UREDI" variant="success" onClick={() => alert('ITAlm | Trenutno onemoguceno !!!')}>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Button>
                                                :
                                                <Button className="tipkaLista" variant="success" disabled>
                                                    <FontAwesomeIcon icon={faLock} />
                                                </Button>
                                        }

                                        <Button className="tipkaLista" variant="danger" title="OBRISI" onClick={() => this.obrisiKorisnika(korisnik.user_id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    </td>
                                </tr>
                            ), this)}
                        </tbody>
                    </Table>
                </Form>
                {
                    this.state.modelUredjivanjaID !== 'false' ?
                        <Modal centered size="lg" show={true} onHide={() => this.setState({ modelUredjivanjaID: 'false' })}>
                            <Modal.Header closeButton>
                                ITAlm | Info korisnika
                            </Modal.Header>
                            <Modal.Body className="almo">

                                <Row className="prviRedInfo">
                                    <Col xs="3">
                                        <Image src={this.state.picture} className="slikaInfo" alt="ITAlm Logo" />
                                    </Col>
                                    <Col className="prviRedCol2">
                                        <h5>Informacije za korisnika: <text>{this.state.nickname}</text></h5>
                                        <p> Ime: <text>{this.state.given_name}</text></p>
                                        <p> Prezime: <text>{this.state.family_name}</text></p>
                                    </Col>
                                </Row>

                                <Row className="drugiRedInfo">
                                    <h5>Detaljniji opis:</h5>
                                    <Col>
                                        <p> Korisnicko ime: <text>{this.state.nickname}</text></p>
                                        <p> E-mail adresa: <text>{this.state.email}</text></p>
                                        <p> ID korisnika: <text>{this.state.user_id}</text></p>
                                        <p> Uredjivano: <text>{this.state.updated_at}</text></p>
                                        <p> Zadnji login: <text>{this.state.last_login}</text></p>
                                        <p> IP adresa: <text>{this.state.last_ip}</text></p>
                                        <p> Broj logovanja: <text>{this.state.logins_count}</text></p>
                                    </Col>
                                </Row>

                            </Modal.Body>
                            <Modal.Footer>
                                {
                                    this.state.user_id.substring(0, 5) === 'auth0' ?
                                        <Button className="tipkaLista" title="UREDI" variant="primary" onClick={() => alert('ITAlm | Trenutno onemoguceno !!!')}>
                                            <FontAwesomeIcon icon={faEdit} /> UREDI
                                        </Button>
                                        :
                                        <Button className="tipkaLista" variant="primary" disabled>
                                            <FontAwesomeIcon icon={faLock} /> UREDI
                                        </Button>
                                }

                                <Button className="tipkaLista" variant="warning" title="OBRISI" onClick={() => this.obrisiKorisnika(this.state.user_id)}>
                                    <FontAwesomeIcon icon={faTrash} /> OBRISI
                                </Button>

                                <Button className="tipkaLista" variant="danger" title="IZLAZ" onClick={() => this.setState({ modelUredjivanjaID: 'false' })}>
                                    IZLAZ
                                </Button>

                            </Modal.Footer>
                        </Modal>
                        :
                        <></>
                }

            </>
        )
    }
}