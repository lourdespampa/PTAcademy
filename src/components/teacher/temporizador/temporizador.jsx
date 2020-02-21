import React from "react";
import $ from "jquery";
import io from "socket.io-client";
import "./temporizador.sass";
import iconExit from "../../../img/cerrar1.png";
//import Modal from 'react-bootstrap/Modal';

class Temporizador extends React.Component {
  constructor(props) {
    super(props);
    this.state = { store: "", valH: "0", valM: "0", valS: "0", open: true, Show: 1 };
    this.onChangeInputH = this.onChangeInputH.bind(this);
    this.onChangeInputM = this.onChangeInputM.bind(this);
    this.onChangeInputS = this.onChangeInputS.bind(this);
  }

  openModal = () => {
    // this.setState({open:true})
    this.setState({
      Show: 1
    })
    $("#modal-temp").css("display", "block");
  };
  closeModal = () => {
    this.setState({
      Show: 0
    })
    $("#modal-temp").css("display", "none");
  };

  onChangeInputH(event) {
    this.setState({ valH: event.target.value });
  }
  onChangeInputM(event) {
    this.setState({ valM: event.target.value });
  }
  onChangeInputS(event) {
    this.setState({ valS: event.target.value });
  }

  componentDidMount = () => {
    const socket = io(this.props.socketUrl, {
      query: { pin: this.props.id_access }
    });

    //let _this = this;

    var g,
      c,
      l,
      d = "",
      e = [
        {
          element: $("#hour"),
          input_element: $("#id_dt_1"),
          value: 36e5
        },
        {
          element: $("#minute"),
          input_element: $("#id_dt_2"),
          value: 6e4
        },
        {
          element: $("#second"),
          input_element: $("#id_dt_3"),
          value: 1e3
        }
      ],
      r = $("#alarm"),
      k = $("#button-start-stop"),
      t = $("#button-reset"),
      u = $("#button-set"),
      et = $("#button-establecer"),
      m = $(".unit_value:visible"),
      n = function () {
        for (var /*a = "",*/ b = g, c = 0; c < e.length; ++c) {
          var d = e[c],
            f = Math.abs(Math.floor(b / d.value));
          b = b % d.value;
          f = 10 > f ? "0" + f : f;
          d.element.html("&#8201;" + f + "&#8201;");
          //a += f
        }
        // q.length !== a.length;
        //const q = a;
      },
      v = function () {
        g = l - Date.now();
        if (0 <= g) {
          n();
        } else {
          clearInterval(d);
          try {
            r.get(0).play();
          } catch (a) { }
          g = 0;
          n();
          m.css("color", "red");
          h(!0);
        }
      },
      h = function (a) {
        a ? k.text("INICIAR") : k.text("PAUSAR");
        t.prop("disabled", !a);
        u.prop("disabled", !a);
        et.prop("disabled", !a);
        for (var b = 0; b < e.length; ++b)
          e[b].input_element.prop("disabled", !a);
      },
      p = function () {
        for (var a = (c = 0); a < e.length; ++a) {
          var b = e[a];
          c +=
            b.value *
            parseInt(b.input_element.val() ? b.input_element.val() : 0);
        }
        var hour = $("#id_dt_1").val();
        var min = $("#id_dt_2").val();
        var sec = $("#id_dt_3").val();

        socket.emit("set", {
          time: [hour, min, sec]
        });
        $("#modal-temp").css("display", "none");
        // $('#establecer_tiempo').modal('hide');
        g = c;
        n();
        m.css("color", "blue");
      },
      x = function () {
        clearInterval(d);
        p();
        h(!0);
      },
      y = function () {
        if ("INICIAR" === k.text()) {
          w();
        } else {
          console.log("Pausa");
          clearInterval(d);
          c = l - Date.now();
          h(!0);
          socket.emit("stop", { state: "pause" });
        }
      },
      w = function () {
        console.log("Empieza");
        clearInterval(d);
        l = Date.now() + c;
        socket.emit("start", {
          state: "play"
        });
        m.css("color", "black");
        h(!1);
        v();
        d = window.setInterval(v, 50);
      };
    window.timer = function (a) {
      p();
      u.click(p);
      t.click(x);
      k.click(y);
      if (a) {
        w();
      }
      $("#modal-temp").css("display", "block");
    };
    window.timer(false); // autostar
  };
  render() {
    return (
      <div className="temporizador">
        <div>
          <div className="counter_part" id="hour_wrapper">
            <div className="unit_value" id="hour">
              .
            </div>
            <div className="unit_name">HORAS</div>
          </div>
          <div className="counter_part colon" id="colon_hour">
            <div className="unit_value">:</div>
            <div className="unit_name">&nbsp;</div>
          </div>
          <div className="counter_part" id="minute_wrapper">
            <div className="unit_value" id="minute">
              .
            </div>
            <div className="unit_name">MINUTOS</div>
          </div>
          <div className="counter_part colon" id="colon_minute">
            <div className="unit_value">:</div>
            <div className="unit_name">&nbsp;</div>
          </div>
          <div className="counter_part" id="second_wrapper">
            <div className="unit_value" id="second">
              .
            </div>
            <div className="unit_name">SEGUNDOS</div>
          </div>
          <audio id="alarm" hidden controls>
            <source
              src="http://www.peter-weinberg.com/files/1014/8073/6015/BeepSound.wav"
              type="audio/wav"
            />
            <source src="/images/clock.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
        <div className="counter-tools">
          <button
            type="button"
            className="pure-button pure-button-primary"
            id="button-start-stop"
          >
            INICIAR
          </button>
          <button
            type="button"
            className="pure-button pure-button-primary"
            id="button-reset"
          >
            REINICIAR
          </button>
          <button
            type="button"
            className="pure-button pure-button-success"
            onClick={() => this.openModal()}
            id="button-establecer"
          >
            ESTABLECER TIEMPO
          </button>
        </div>

        <div id="modal-general_container" className={this.state.Show === 0 ? "" : this.state.Show === 1 ? "six" : this.state.Show === 2 ? "six out" : ""}>
          <div className="modal-general_background" >
            <div className="modal-general_bg_content">
              <button className="modal-general_close" onClick={this.closeModal}>
                <img className="button-zoom" src={iconExit} alt="imagen de cerrar modal" />
              </button>
              <div className="modal-general_container">
                <div className="modal-general_container_header">
                  <span className="modal-title__controlname" style={{ color: 'black' }}>ESTABLECER TIEMPO</span>
                </div>
                <div className="modal-general_container_body">
                  <form class="temporizador_form">
                    <div>
                      <label>Horas</label>
                      <input
                        className="pure-input-1"
                        type="number"
                        id="id_dt_1"
                        value={this.state.valH}
                        min="0"
                        onChange={this.onChangeInputH}
                      />
                    </div>
                    <div>
                      <label>Minutos</label>
                      <input
                        className="pure-input-1"
                        type="number"
                        id="id_dt_2"
                        value={this.state.valM}
                        min="0"
                        onChange={this.onChangeInputM}
                      />
                    </div>
                    <div>
                      <label>Segundos</label>
                      <input
                        className="pure-input-1"
                        type="number"
                        id="id_dt_3"
                        value={this.state.valS}
                        min="0"
                        onChange={this.onChangeInputS}
                      />
                    </div>
                  </form>
                  <br />
                  <button
                    type="button"
                    id="button-set"
                    className="btnenviarvideo"
                  >
                    <div className="button-zoom" onClick={this.closeModal}>ESTABLECER TIEMPO</div>
                  </button>
                </div>
              </div>
              <svg className="modal-general_svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <rect x="0" y="0" fill="none" rx="3" ry="3"></rect>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Temporizador;
