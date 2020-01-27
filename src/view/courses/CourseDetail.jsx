import React, { Component } from "react";
import "./CourseDetail.sass";
export default class CourseDetail extends Component {
  Abrir = () => {
    const nav = document.getElementById("main-nav");
    nav.classList.toggle("show");
  };
  render() {
    return (
      <div className="CourseDetail__Container">
        {/* <div className="CourseDetail__Navbar">
          En esta seccion va a estar el nombre del profesr
          <header className="teacherCourses__main-header">
            <div className="teacherCourses__l-container teacherCourses__main-header__block">
              <h3>Nombre del profesor o el curso xd</h3>
              <div
                className="teacherCourses__main-menu-toggle"
                id="main-menu-toggle"
                onClick={this.Abrir}
              ></div>
              <nav className="teacherCourses__main-nav" id="main-nav">
                <ul className="teacherCourses__main-menu">
                  <li className="teacherCourses__main-menu__item">
                    <button classNameclassName="teacherCourses__main-menu__LogOut">
                      Agregar alumno
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
        </div> */}
        <div>
        <h1 className="CourseDetail__title">
            Lista de alumnos
        </h1>
        </div>
        
        <table class="CourseDetail__table">
          <tbody className="CourseDetail__table-body">
            <tr className="CourseDetail__table-tr">
              <th className="CourseDetail__table-th">Apellidos</th>
              <th className="CourseDetail__table-th">Nombres</th>
              <th className="CourseDetail__table-th">Competencia 1</th>
              <th className="CourseDetail__table-th">Competencia 2</th>
              <th className="CourseDetail__table-th">Competencia 3</th>
              <th className="CourseDetail__table-th">Competencia 4</th>
            </tr>
            <tr className="CourseDetail__table-tr">
              <td className="CourseDetail__table-td" data-th="Apellidos">UPS5005</td>
              <td className="CourseDetail__table-td" data-th="Nombres">UPS</td>
              <td className="CourseDetail__table-td" data-th="Compentencia 1">ASDF19218</td>
              <td className="CourseDetail__table-td" data-th="Competencia 2">06/25/2016</td>
              <td className="CourseDetail__table-td" data-th="Competencia 3">12/25/2016</td>
              <td className="CourseDetail__table-td" data-th="Competencia 4">$8,322.12</td>
            </tr>
            <tr className="CourseDetail__table-tr">
              <td className="CourseDetail__table-td" data-th="Apellidos">UPS3449</td>
              <td className="CourseDetail__table-td" data-th="Nombres">UPS South Inc.</td>
              <td className="CourseDetail__table-td" data-th="Compentencia 1">ASDF29301</td>
              <td className="CourseDetail__table-td" data-th="Competencia 2">6/24/2016</td>
              <td className="CourseDetail__table-td" data-th="Competencia 3">12/25/2016</td>
              <td className="CourseDetail__table-td" data-th="Competencia 4">$3,255.49</td>
            </tr>
            <tr className="CourseDetail__table-tr">
              <td className="CourseDetail__table-td" data-th="Apellidos">BOX5599</td>
              <td className="CourseDetail__table-td" data-th="Nombres">BOX Pro West</td>
              <td className="CourseDetail__table-td" data-th="Compentencia 1">ASDF43000</td>
              <td className="CourseDetail__table-td" data-th="Competencia 2">6/27/2016</td>
              <td className="CourseDetail__table-td" data-th="Competencia 3">12/25/2016</td>
              <td className="CourseDetail__table-td" data-th="Competencia 4">$45,255.49</td>
            </tr>
            <tr className="CourseDetail__table-tr">
              <td className="CourseDetail__table-td" data-th="Apellidos">PAN9999</td>
              <td className="CourseDetail__table-td" data-th="Nombres">Pan Providers and Co.</td>
              <td className="CourseDetail__table-td" data-th="Compentencia 1">ASDF33433</td>
              <td className="CourseDetail__table-td" data-th="Competencia 2">6/29/2016</td>
              <td className="CourseDetail__table-td" data-th="Competencia 3">12/25/2016</td>
              <td className="CourseDetail__table-td" data-th="Competencia 4">$12,335.69</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
