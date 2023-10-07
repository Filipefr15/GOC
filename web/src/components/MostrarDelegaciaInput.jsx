import { useState } from "react";
import { Button, Card, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { Input } from "./Input";

export function MostrarDelegaciaInput(props) {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [isUpdated, setIsUpdated] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showVisualizarModal, setShowVisualizarModal] = useState(false);
    const [isDelegaciaAtrelada, setIsDelegaciaAtrelada] = useState(false);


    async function updateDelegacia(data) {
        await props.updateDelegacia({ ...data, id: props.delegacia.id });
        setIsUpdated(false);


    }
    const handleDeleteItem = async () => {
        //fazer outro useState com boletim de ocorrencia para verificar se está linkado a algum 
        await props.deleteDelegacia();
        setShowDeleteModal(false);
    }



    return (
        <>
            <Card className="mb-3 p-3 bg-light">
                <Card.Title><strong>Nome Delegacia: </strong>{props.delegacia.nomeDelegacia}</Card.Title>
                <Card.Text><strong>Delegado: </strong>{props.delegacia.delegado}</Card.Text>
                <Card.Text><strong>Estado: </strong>{props.delegacia.estadoDelegacia}</Card.Text>
                <Card.Text><strong>Município: </strong>{props.delegacia.municipioDelegacia}</Card.Text>
                <Card.Text><strong>Bairro: </strong>{props.delegacia.bairroDelegacia}</Card.Text>
                <Row xs="auto" className="d-flex justify-content-end">
                    <Button variant="secondary" onClick={() => setIsUpdated(true)}>Editar</Button>
                    <Button
                        variant="outline-danger"
                        className="ms-3"
                        onClick={() => setShowDeleteModal(true)}
                    >
                        Deletar
                    </Button>


                    <Button
                        variant="outline-info"
                        className="ms-3"
                        onClick={() => setShowVisualizarModal(true)}
                    >
                        Visualizar
                    </Button>
                </Row>
            </Card>
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Deleção</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tem certeza de que deseja deletar este item?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="outline-danger" onClick={() => handleDeleteItem()}>Deletar</Button>
                </Modal.Footer>
            </Modal>


            <Modal show={showVisualizarModal} onHide={() => setShowVisualizarModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Dados da Delegacia</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>Id delegacia: </strong>{props.delegacia.id}</p>
                    <p><strong>Nome da Delegacia: </strong>{props.delegacia.nomeDelegacia}</p>
                    <p><strong>Nome do Delegado: </strong>{props.delegacia.delegado}</p>
                    <p><strong>Estado: </strong>{props.delegacia.estadoDelegacia}</p>
                    <p><strong>Município: </strong>{props.delegacia.municipioDelegacia}</p>
                    <p><strong>Bairro: </strong>{props.delegacia.bairroDelegacia}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowVisualizarModal(false)}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>



            <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
                <Form noValidate onSubmit={handleSubmit(updateDelegacia)} validated={!!errors}>
                    <Modal.Body>
                        <Input
                            className="mb-3"
                            type='text'
                            defaultValue={props.delegacia.nomeDelegacia}
                            label='Nome atual da Delegacia'
                            placeholder='Insira o novo nome da Delegacia'
                            required={true}
                            name='nomeDelegacia'
                            error={errors.nomeDelegacia}
                            validations={register('nomeDelegacia', {
                                required: {
                                    value: true,
                                    message: 'Novo nome da Delegacia é obrigatório.'
                                }
                            })}
                        />
                        {/* <Form.Group>
                            <Form.Label>Selecione o NOVO status do Boletim de Ocorrência</Form.Label>
                            <Form.Select {...register('statusBoletim')} defaultValue={props.boletimOcorrencia.statusBoletim}>
                                <option disabled>Clique para selecionar</option>
                                <option value={'Em andamento...'}>Em andamento...</option>
                                <option value={'Finalizado'}>Finalizado</option>
                                <option value={'Em perícia'}>Em perícia</option>
                                <option value={'URGENTE'}>URGENTE</option>
                            </Form.Select>
                        </Form.Group> */}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">
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
