import { useState } from "react";
import { Button, Card, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { Input } from "./Input";

export function BoletimOcorrenciaInput(props) {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [isUpdated, setIsUpdated] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showVisualizarModal, setShowVisualizarModal] = useState(false);

    async function updateBoletimOcorrencia(data) {
        await props.updateBoletimOcorrencia({ ...data, id: props.boletimOcorrencia.id });
        setIsUpdated(false);
    }
    const handleDeleteItem = async () => {
        // Execute a lógica de deleção aqui, por exemplo:
        await props.deleteBoletimOcorrencia();
        setShowDeleteModal(false); // Feche o modal após a deleção
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
                     <Modal show={showVisualizarModal} onHide={() => setShowVisualizarModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Dados do Boletim de Ocorrência</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>Data Protocolo Boletim Ocorrência: </strong>{props.boletimOcorrencia.data}</p>
                    <p><strong>Nome Comunicante: </strong>{props.boletimOcorrencia.nomeComunicante}</p>
                    <p><strong>Tipo da Ocorrência: </strong>{props.boletimOcorrencia.tipoOcorrencia}</p>
                    <p><strong>Estado da Ocorrência: </strong>{props.boletimOcorrencia.estadoOcorrencia}</p>
                    <p><strong>Municipio da Ocorrência: </strong>{props.boletimOcorrencia.municipioOcorrencia}</p>
                    <p><strong>Bairro da Ocorrência: </strong>{props.boletimOcorrencia.bairroOcorrencia}</p>
                    <p><strong>Detalhes do Local da Ocorrência: </strong>{props.boletimOcorrencia.detalhesLocalOcorrencia}</p>
                    <p><strong>Narrativa da Ocorrência: </strong>{props.boletimOcorrencia.narrativaOcorrencia}</p>
                    <p><strong>CPF do Comunicante: </strong>{props.boletimOcorrencia.cpfComunicante}</p>
                    <p><strong>RG do Comunicante: </strong>{props.boletimOcorrencia.rgComunicante}</p>
                    <p><strong>Nome da Mãe do Comunicante: </strong>{props.boletimOcorrencia.nomeMaeComunicante}</p>
                    <p><strong>Status do Boletim Ocorrência: </strong>{props.boletimOcorrencia.statusBoletim}</p>
                    {/* Adicione aqui os outros dados do boletim de ocorrência */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowVisualizarModal(false)}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
            
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
                    <Modal.Title>Confirmar Deleção</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tem certeza de que deseja deletar este item?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowVisualizarModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="outline-danger" onClick={() => handleDeleteItem()}>Deletar</Button>
                </Modal.Footer>
            </Modal>


            <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
                <Modal.Header>
                    <Modal.Title>Status Boletim: {props.boletimOcorrencia.statusBoletim}</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(updateBoletimOcorrencia)} validated={!!errors}>
                    <Modal.Body>
                        <Input
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
                        />
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
