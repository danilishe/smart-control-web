import React from "react";

export const NavBar: React.FC = () => (<nav>
        <div className="nav-wrapper red darken-3">
            <a href="." className="brand-logo center">SmartControl Web</a>
            <ul className="left hide-on-med-and-down">
                <li><a href=".">Загрузить</a></li>
                <li><a href=".">Сохранить</a></li>
                <li><a href=".">Экспорт</a></li>
            </ul>
            <ul className="right hide-on-med-and-down">
                <li><a href="."><i className="material-icons left">settings</i>Настройки</a></li>
            </ul>
        </div>
    </nav>
)