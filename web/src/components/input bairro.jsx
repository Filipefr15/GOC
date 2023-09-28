import { FloatingLabel, Form } from "react-bootstrap";

export function SelectInputBairro(props) {
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
                    <option value="">Selecione uma opção</option>
                    <option value="Zona Norte">Zona Norte</option>
                    <option value="Zona Sul">Zona Sul</option>
                    <option value="Zona Leste">Zona Leste</option>
                    <option value="Zona Oeste">Zona Oeste</option>
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
