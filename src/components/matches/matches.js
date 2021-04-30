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

            }
        }
    }

    async componentDidMount() {

        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/match/${this.props.match.params.id}`)
        const user = {};

        this.setState({
            matches: data.matches,
            user

        })
    }
    render() {
        console.log(this.state.matches);
        return (
            <>
                <Header></Header>

                <div className="main-content-wrapper medium-padding120">
                    <section className="pt-mobile-80">
                        <div className="container">
                            <div className="row medium-padding100">
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Game</th>
                                                <th>Player 1</th>
                                                <th></th>
                                                <th>PLayer 2</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                            {this.state.matches.map((match,index)=>{
                                                return <tr key={match._id}>
                                                    <td>{index+1}</td>
                                                    
                                                <td>{match.player1.name}</td>
                                                <td><span style={{color:'green'}}>VS</span></td>
                                                <td>{match.player2.name}</td>
                                            </tr>
                                            })}
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
