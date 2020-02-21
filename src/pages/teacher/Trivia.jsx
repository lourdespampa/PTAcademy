import React from "react";
import Trivia from "../../components/teacher/trivia/Trivia";
const Triviacontainer = props => {
  return (
    <div>
      <Trivia
        socketUrl={props.socketUrl}
        id_access={props.id_access}
        apiUrl={props.apiUrl}
      />
    </div>
  );
};
export default Triviacontainer;
