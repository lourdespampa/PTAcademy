import React, { Component } from "react";
import axios from 'axios';
export default class AllQuestions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cursoConAlumnos: true,
            hola: "holamunod",
            // see: false,
        }
    }
    // ShowAnswer(){
    //     this.setState({see});    
    // }
    render() {
        return (
            <>
                <div className="QuestionsListClass">
                    <div className="QuestionsCards">{this.props.question}
                        <button className="classTrivia__button-Edit" >
                            <i className="far fa-eye"></i>
                        </button>
                            {/* {this.state.editar ? (
                                <button className="classTrivia__button-Edit" >
                                    <i className="far fa-eye"></i>
                                </button>
                            ) : (
                                <button className="classTrivia__button-Edit" >
                                       <i class="far fa-eye-slash"></i>
                                    </button>
                                )} */}
                        <div id="AnswersCards">
                            {/* <p>{this.props.answer1}</p>
                            <p>{this.props.answer2}</p>
                            <p>{this.props.answer3}</p>
                            <p>{this.props.answer4}</p> */}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
