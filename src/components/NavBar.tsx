import React, { MouseEventHandler, useRef, useState } from "react";
import Form from 'react-bootstrap/Form'
import { useSelector } from "react-redux";
import { createDataLink } from "../util/exporters";
import { AppParams, ProgramSettings } from "../defaultParams";
import { RootState } from "../reducer/rootReducer";
import { Button, ButtonGroup, Modal, ToggleButton } from "react-bootstrap";
import { ColorMode } from "../model/ColorMode";

export const NavBar = () => {
    const program = useSelector((state: RootState) => state.programReducer.effects);
    const downloadLinkRef = useRef<HTMLAnchorElement>(null)
    const exportProgram: MouseEventHandler<HTMLAnchorElement> = async (event) => {
        event.preventDefault();
        downloadLinkRef.current!.href = await createDataLink(ProgramSettings, program);
        downloadLinkRef.current!.click();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand" target="_blank" rel="noreferrer" href="https://is-led.ru">Smart Control
                    Web</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <ModalSettings title="Настройки" />

                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="\">Сохранить</a>
                        </li>
                        <li className="nav-item">
                            <a className={"nav-link " + (program.length ? "active" : "disabled")}
                               onClick={exportProgram}>Экспорт</a>
                        </li>
                    </ul>
                </div>
            </div>
            <a ref={downloadLinkRef} href=""
               type="application/octet-stream"
               download={AppParams.defaultExportFileName}
               target="_self" hidden />
        </nav>);
}

interface ModalSettingsProps {
    title: string
}

function ModalSettings({ title }: ModalSettingsProps) {
    const [show, setShow] = useState(false);
    const [radioValue, setRadioValue] = useState(ColorMode.Mono);
    const radios = [
        { name: 'Один цвет', value: ColorMode.Mono },
        { name: 'RGB', value: ColorMode.RGB },
    ];
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button type="button" variant="outline-primary" onClick={handleShow}>{title}</Button>

            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Настройки</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="d-flex justify-content-between align-items-center">
                        <Form.Label>Количество ламп</Form.Label>
                        <Form.Control type="number" min={1} max={45} value={8} />
                    </Form.Group>

                    <Form.Group className="d-flex justify-content-between align-items-center">
                        <Form.Label>Режим</Form.Label>
                        <ButtonGroup>
                            {radios.map((radio, idx) => (
                                <ToggleButton
                                    key={idx}
                                    id={`radio-${idx}`}
                                    type="radio"
                                    name="radio"
                                    value={radio.value.valueOf()}
                                    checked={radioValue === radio.value.valueOf()}
                                    variant={radioValue === radio.value.valueOf() ? "primary" : "outline-primary"}
                                    onChange={(e) => setRadioValue(parseInt(e.currentTarget.value))}
                                >
                                    {radio.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Отмена</Button>
                    <Button variant="primary" onClick={handleClose} type="submit">Сохранить</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
        ;
}
