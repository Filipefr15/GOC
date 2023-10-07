import { useEffect, useState } from "react";
import { Button, Card, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { getOneDelegacia } from "../services/register-delegacia-services"
import { getDelegacia } from "../services/register-delegacia-services"

import "../styles/global.css"

import { Input } from "./Input";

export function BoletimOcorrenciaInput(props) {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [isUpdated, setIsUpdated] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showVisualizarModal, setShowVisualizarModal] = useState(false);
    const [mostrarDelegacia, setMostrarDelegacia] = useState(false);
    const [delegacias, setDelegacias] = useState([]);



    useEffect(() => {
        coletarDelegacia()
    }, [])

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getDelegacia();
                setDelegacias(response.data); // Supondo que o resultado da API seja um array de objetos de delegacias
            } catch (error) {
                console.error("Erro ao buscar delegacias:", error);
            }
        }
        fetchData();
    }, []);


    async function coletarDelegacia() {
        const result = await getOneDelegacia(props.boletimOcorrencia.idDelegacia)
        setMostrarDelegacia(result.data.nomeDelegacia)
    }

    async function updateBoletimOcorrencia(data) {
        await props.updateBoletimOcorrencia({ ...data, id: props.boletimOcorrencia.id });
        setIsUpdated(false);


    }
    const handleDeleteItem = async () => {
        // Execute a lógica de deleção aqui, por exemplo:
        await props.deleteBoletimOcorrencia();
        setShowDeleteModal(false); // Feche o modal após a deleção
    }


    function formatarData(data) {
        return new Date(data).toLocaleDateString('pt-BR');
    }

    return (
        <>
            <Card className="mb-3 p-3 bg-light">
                <Card.Title><strong>Data: </strong>{formatarData(props.boletimOcorrencia.data)}</Card.Title>
                <Card.Text><strong>Nome Comunicante: </strong>{props.boletimOcorrencia.nomeComunicante}</Card.Text>
                <Card.Text><strong>Status Boletim Ocorrência: </strong>{props.boletimOcorrencia.statusBoletim}</Card.Text>
                <Card.Text><strong>Tipo da Ocorrência: </strong>{props.boletimOcorrencia.tipoOcorrencia}</Card.Text>
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
                    <Modal.Title>
                        <div className="divVisualizar">
                            Dados do Boletim de Ocorrência
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>Data Protocolo Boletim Ocorrência: </strong>{formatarData(props.boletimOcorrencia.data)}</p>
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
                    <p><strong>Nome Delegacia: </strong>{mostrarDelegacia ? mostrarDelegacia : "Delegacia"}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowVisualizarModal(false)}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>



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
                            label='Status atual do Boletim de Ocorrência'
                            placeholder='Insira o nome do alimento'
                            required={true}
                            name='statusBoletim'
                            error={errors.statusBoletim}
                            validations={register('statusBoletim', {
                                required: {
                                    value: true,
                                    message: 'Status do Boletim de Ocorrência é Obrigatório.'
                                }
                            })}
                        />
                        <Input
                            className="mb-3"
                            type='text'
                            defaultValue={props.boletimOcorrencia.idDelegacia}
                            label='Status atual do Boletim de Ocorrência'
                            placeholder='Insira o nome do alimento'
                            required={true}
                            name='idDelegacia'
                            error={errors.idDelegacia}
                            validations={register('idDelegacia', {
                                required: {
                                    value: true,
                                    message: 'Status do Boletim de Ocorrência é Obrigatório.'
                                }
                            })}
                        /> */}
                        <Form.Group>
                            <Form.Label>Selecione o status do Boletim de Ocorrência</Form.Label>
                            <Form.Select {...register('statusBoletim')} defaultValue={props.boletimOcorrencia.statusBoletim}>
                                <option disabled>{props.boletimOcorrencia.statusBoletim}</option>
                                <option value={'Em andamento...'}>Em andamento...</option>
                                <option value={'Finalizado'}>Finalizado</option>
                                <option value={'Em perícia'}>Em perícia</option>
                                <option value={'URGENTE'}>URGENTE</option>
                            </Form.Select>
                            <Form.Group>
                                <Form.Label>Selecione a Delegacia</Form.Label>
                                <Form.Select {...register('idDelegacia')} defaultValue={props.boletimOcorrencia.idDelegacia}>
                                    <option disabled></option>
                                    {delegacias.map((delegacia) => (
                                        <option key={delegacia.id} value={delegacia.id}>
                                            {delegacia.nomeDelegacia}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

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
