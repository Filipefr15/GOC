import { useState } from "react";
import { Button, Card, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { Input } from "./Input";

export function BoletimOcorrenciaInput(props) {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [isUpdated, setIsUpdated] = useState(false);

    async function updateBoletimOcorrencia(data) {
        await props.updateBoletimOcorrencia({ ...data, id: props.boletimOcorrencia.id });
        setIsUpdated(false);
    }

    return (
        <>
            <Card className="mb-3 p-3 bg-light">
                <Card.Title><strong>Data: </strong>{props.boletimOcorrencia.data}</Card.Title>
                <Card.Text><strong>Nome Comunicante: </strong>{props.boletimOcorrencia.nomeComunicante}</Card.Text>
                <Card.Text><strong>Status Boletim Ocorrência: </strong>{props.boletimOcorrencia.statusBoletim}</Card.Text>
                <Row xs="auto" className="d-flex justify-content-end">
                    <Button variant="secondary" onClick={() => setIsUpdated(true)}>Editar</Button>
                    <Button
                        variant="outline-danger"
                        className="ms-3"
                        onClick={props.deleteBoletimOcorrencia}
                    >
                        Apagar
                    </Button>
                    
                    <Button
                        variant="outline-info"
                        className="ms-3"
                        onClick={props.deleteBoletimOcorrencia}
                    >
                    Visualizar
                    </Button>
                </Row>
            </Card>
            <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
                <Modal.Header>
                    <Modal.Title>Status Boletim: {props.boletimOcorrencia.statusBoletim}</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(updateBoletimOcorrencia)} validated={!!errors}>
                    <Modal.Body>
                        {/* <Input
                            className="mb-3"
                            type='text'
                            defaultValue={props.boletimOcorrencia.statusBoletim}
                            label='Nome do alimento'
                            placeholder='Insira o nome do alimento'
                            required={true}
                            name='statusBoletim'
                            error={errors.statusBoletim}
                            validations={register('statusBoletim', {
                                required: {
                                    value: true,
                                    message: 'Nome do alimento é obrigatório.'
                                }
                            })}
                        /> */}
                        <Form.Group>
                            <Form.Label>Selecione o status do boletim de ocorrência</Form.Label>
                            <Form.Select {...register('statusBoletim')} defaultValue={props.boletimOcorrencia.statusBoletim}>
                                <option disabled>Clique para selecionar</option>
                                <option value={'Em andamento...'}>Em andamento...</option>
                                <option value={'Finalizado'}>Finalizado</option>
                            </Form.Select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit" onClick={() => setIsUpdated(true)}> 
                            Editar
                        </Button>
                        <Button variant="secondary" onClick={() => setIsUpdated(false)}>
                            Fechar
                        </Button>
                        
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}
