import { FloatingLabel, Form } from "react-bootstrap";

export function SelectInputCidade(props) {
    return (
        <Form.Group className={props.className}>
            <FloatingLabel label={props.label}>
                <Form.Select
                    id={props.name}
                    name={props.name}
                    defaultValue={props.defaultValue}
                    isInvalid={props.error}
                    size="3"
                    {...props.validations}
                >
                    <option value="">Selecione a cidade do ocorrido</option>
                    <option value="Acorizal">Acorizal</option>
                    <option value="Água Boa">Água Boa</option>
                    <option value="Alta Floresta">Alta Floresta</option>
                    <option value="Alto Araguaia">Alto Araguaia</option>
                    <option value="Alto Boa Vista">Alto Boa Vista</option>
                    <option value="Alto Garças">Alto Garças</option>
                    <option value="Alto Paraguai">Alto Paraguai</option>
                    <option value="Alto Taquari">Alto Taquari</option>
                    <option value="Apiacás">Apiacás</option>
                    <option value="Araguaiana">Araguaiana</option>
                    <option value="Araguainha">Araguainha</option>
                    <option value="Araputanga">Araputanga</option>
                    <option value="Arenápolis">Arenápolis</option>
                    <option value="Aripuanã">Aripuanã</option>
                    <option value="Barão de Melgaço">Barão de Melgaço</option>
                    <option value="Barra do Bugres">Barra do Bugres</option>
                    <option value="Barra do Garças">Barra do Garças</option>
                    <option value="Bom Jesus do Araguaia">Bom Jesus do Araguaia</option>
                    <option value="Brasnorte">Brasnorte</option>
                    <option value="Cáceres">Cáceres</option>
                    <option value="Campinápolis">Campinápolis</option>
                    <option value="Campo Novo do Parecis">Campo Novo do Parecis</option>
                    <option value="Campo Verde">Campo Verde</option>
                    <option value="Campos de Júlio">Campos de Júlio</option>
                    <option value="Cana Brava do Norte">Cana Brava do Norte</option>
                    <option value="Canarana">Canarana</option>
                    <option value="Carlinda">Carlinda</option>
                    <option value="Castanheira">Castanheira</option>
                    <option value="Chapada dos Guimarães">Chapada dos Guimarães</option>
                    <option value="Cláudia">Cláudia</option>
                    <option value="Cocalinho">Cocalinho</option>
                    <option value="Colider">Colider</option>
                    <option value="Colniza">Colniza</option>
                    <option value="Comodoro">Comodoro</option>
                    <option value="Confresa">Confresa</option>
                    <option value="Conquista d'Oeste">Conquista d'Oeste</option>
                    <option value="Cotriguaçu">Cotriguaçu</option>
                    <option value="Cuiabá">Cuiabá</option>
                    <option value="Curvelândia">Curvelândia</option>
                    <option value="Denise">Denise</option>
                    <option value="Diamantino">Diamantino</option>
                    <option value="Dom Aquino">Dom Aquino</option>
                    <option value="Feliz Natal">Feliz Natal</option>
                    <option value="Figueirópolis d'Oeste">Figueirópolis d'Oeste</option>
                    <option value="Gaúcha do Norte">Gaúcha do Norte</option>
                    <option value="General Carneiro">General Carneiro</option>
                    <option value="Glória d'Oeste">Glória d'Oeste</option>
                    <option value="Guarantã do Norte">Guarantã do Norte</option>
                    <option value="Guiratinga">Guiratinga</option>
                    <option value="Indiavaí">Indiavaí</option>
                    <option value="Ipiranga do Norte">Ipiranga do Norte</option>
                    <option value="Itanhangá">Itanhangá</option>
                    <option value="Itaúba">Itaúba</option>
                    <option value="Itiquira">Itiquira</option>
                    <option value="Jaciara">Jaciara</option>
                    <option value="Jangada">Jangada</option>
                    <option value="Jauru">Jauru</option>
                    <option value="Juara">Juara</option>
                    <option value="Juína">Juína</option>
                    <option value="Juruena">Juruena</option>
                    <option value="Juscimeira">Juscimeira</option>
                    <option value="Lambari d'Oeste">Lambari d'Oeste</option>
                    <option value="Lucas do Rio Verde">Lucas do Rio Verde</option>
                    <option value="Luciara">Luciara</option>
                    <option value="Marcelândia">Marcelândia</option>
                    <option value="Matupá">Matupá</option>
                    <option value="Mirassol d'Oeste">Mirassol d'Oeste</option>
                    <option value="Nobres">Nobres</option>
                    <option value="Nortelândia">Nortelândia</option>
                    <option value="Nossa Senhora do Livramento">Nossa Senhora do Livramento</option>
                    <option value="Nova Bandeirantes">Nova Bandeirantes</option>
                    <option value="Nova Brasilândia">Nova Brasilândia</option>
                    <option value="Nova Canaã do Norte">Nova Canaã do Norte</option>
                    <option value="Nova Guarita">Nova Guarita</option>
                    <option value="Nova Lacerda">Nova Lacerda</option>
                    <option value="Nova Marilândia">Nova Marilândia</option>
                    <option value="Nova Maringá">Nova Maringá</option>
                    <option value="Nova Monte Verde">Nova Monte Verde</option>
                    <option value="Nova Mutum">Nova Mutum</option>
                    <option value="Nova Nazaré">Nova Nazaré</option>
                    <option value="Nova Olímpia">Nova Olímpia</option>
                    <option value="Nova Santa Helena">Nova Santa Helena</option>
                    <option value="Nova Ubiratã">Nova Ubiratã</option>
                    <option value="Nova Xavantina">Nova Xavantina</option>
                    <option value="Novo Horizonte do Norte">Novo Horizonte do Norte</option>
                    <option value="Novo Mundo">Novo Mundo</option>
                    <option value="Novo Santo Antônio">Novo Santo Antônio</option>
                    <option value="Novo São Joaquim">Novo São Joaquim</option>
                    <option value="Paranaíta">Paranaíta</option>
                    <option value="Paranatinga">Paranatinga</option>
                    <option value="Pedra Preta">Pedra Preta</option>
                    <option value="Peixoto de Azevedo">Peixoto de Azevedo</option>
                    <option value="Planalto da Serra">Planalto da Serra</option>
                    <option value="Poconé">Poconé</option>
                    <option value="Pontal do Araguaia">Pontal do Araguaia</option>
                    <option value="Ponte Branca">Ponte Branca</option>
                    <option value="Pontes e Lacerda">Pontes e Lacerda</option>
                    <option value="Porto Alegre do Norte">Porto Alegre do Norte</option>
                    <option value="Porto dos Gaúchos">Porto dos Gaúchos</option>
                    <option value="Porto Esperidião">Porto Esperidião</option>
                    <option value="Porto Estrela">Porto Estrela</option>
                    <option value="Poxoréu">Poxoréu</option>
                    <option value="Primavera do Leste">Primavera do Leste</option>
                    <option value="Querência">Querência</option>
                    <option value="Reserva do Cabaçal">Reserva do Cabaçal</option>
                    <option value="Ribeirão Cascalheira">Ribeirão Cascalheira</option>
                    <option value="Ribeirãozinho">Ribeirãozinho</option>
                    <option value="Rio Branco">Rio Branco</option>
                    <option value="Rondolândia">Rondolândia</option>
                    <option value="Rondonópolis">Rondonópolis</option>
                    <option value="Rosário Oeste">Rosário Oeste</option>
                    <option value="Salto do Céu">Salto do Céu</option>
                    <option value="Santa Carmem">Santa Carmem</option>
                    <option value="Santa Cruz do Xingu">Santa Cruz do Xingu</option>
                    <option value="Santa Rita do Trivelato">Santa Rita do Trivelato</option>
                    <option value="Santa Terezinha">Santa Terezinha</option>
                    <option value="Santo Afonso">Santo Afonso</option>
                    <option value="Santo Antônio de Leverger">Santo Antônio de Leverger</option>
                    <option value="Santo Antônio do Leste">Santo Antônio do Leste</option>
                    <option value="São Félix do Araguaia">São Félix do Araguaia</option>
                    <option value="São José do Povo">São José do Povo</option>
                    <option value="São José do Rio Claro">São José do Rio Claro</option>
                    <option value="São José do Xingu">São José do Xingu</option>
                    <option value="São José dos Quatro Marcos">São José dos Quatro Marcos</option>
                    <option value="São Pedro da Cipa">São Pedro da Cipa</option>
                    <option value="Sapezal">Sapezal</option>
                    <option value="Serra Nova Dourada">Serra Nova Dourada</option>
                    <option value="Sinop">Sinop</option>
                    <option value="Sorriso">Sorriso</option>
                    <option value="Tabaporã">Tabaporã</option>
                    <option value="Tangará da Serra">Tangará da Serra</option>
                    <option value="Tapurah">Tapurah</option>
                    <option value="Terra Nova do Norte">Terra Nova do Norte</option>
                    <option value="Tesouro">Tesouro</option>
                    <option value="Torixoréu">Torixoréu</option>
                    <option value="União do Sul">União do Sul</option>
                    <option value="Vale de São Domingos">Vale de São Domingos</option>
                    <option value="Várzea Grande">Várzea Grande</option>
                    <option value="Vera">Vera</option>
                    <option value="Vila Bela da Santíssima Trindade">Vila Bela da Santíssima Trindade</option>
                    <option value="Vila Rica">Vila Rica</option>
                </Form.Select>
                {props.error && (
                    <Form.Control.Feedback type="invalid">
                        {props.error.message}
                    </Form.Control.Feedback>
                )}
            </FloatingLabel>
        </Form.Group>
    );
}
