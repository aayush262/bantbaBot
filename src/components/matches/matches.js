import axios from 'axios';
import React from 'react';
import { Header } from '../header/header';

export class Matches extends React.Component {
    constructor() {
        super();
        this.state = {
            matches: [{
                player1: {
                    id: '',
                    name: ''
                },
                player2: {
                    id: '',
                    name: ''
                }
            }],
            user: {

            },
            owner: {
                id: '',
                name: ''
            },
            players: [
                {
                    id: '',
                    name: '',
                    points: 0
                }
            ],
            lobbyName: '',
            game: '',
            type: ''
        }
    }

    async componentDidMount() {

        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/match/${this.props.match.params.id}`)
        const user = {};

        this.setState({
            matches: data.matches,
            owner: data.owner,
            players: data.players,
            lobbyName: data.name,
            game: data.game,
            type: data.type

        })
    }
    render() {
        const length = this.state.players.length;
        console.log(length)
        const dire = [{}];
        const radiant = [{}];
        for (var i = 5; i < length; i++) {
            dire.push(this.state.players[i])
        }
        for (var i = 0; i < 5; i++) {
            radiant.push(this.state.players[i])
        }
        const radiantTable = radiant.map((player) => {
            if (player) {
                return <tr key={player.id}>

                    <td>{player.name}</td>

                </tr>
            }
        })
        const direTable = dire.map((player) => {

            if (player) {
                return <tr key={player.id}>

                    <td>{player.name}</td>

                </tr>
            }
        })

        return (
            <>
                <Header></Header>

                <div className="main-content-wrapper medium-padding120">
                    <section className="pt-mobile-80">
                        <div className="container">
                            <div className="row medium-padding100">
                                <h3 className="event-title mb20" style={{ color: 'rgb(52, 229, 235)' }}>{this.state.lobbyName}&nbsp;&nbsp;<span style={{ color: 'white' }}>({this.state.game})</span></h3>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                    <h3>{this.state.type === 'lobby' ? 'Radiant' : 'Matches'}</h3>
                                    {this.state.type === 'lobby' ? <table style={{ border: '2px solid red' }}>

                                        <tbody>
                                            {radiantTable}

                                        </tbody>
                                    </table> : <table>
                                        <thead>
                                            <tr>
                                                <th>Game</th>
                                                <th>Player 1</th>
                                                <th></th>
                                                <th>PLayer 2</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {this.state.matches.map((match, index) => {
                                                return <tr key={match._id}>
                                                    <td>{index + 1}</td>

                                                    <td>{match.player1.name}</td>
                                                    <td><span style={{ color: 'green' }}>VS</span></td>
                                                    <td>{match.player2.name}</td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </table>
                                    }
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                    <h3>{this.state.type === 'lobby' ? 'Dire' : 'Table'}</h3>
                                    <table style={{ border: '2px solid red' }}>

                                        <tbody>

                                            {direTable}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <hr className="divider" />
                        </div>
                    </section>
                </div>

            </>
        )
    }
}
