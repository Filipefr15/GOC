import { FloatingLabel, Form } from "react-bootstrap";

export function SelectOcorrenciaInput(props) {
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
                    <option value="">Selecione a ocorrência</option>
                    <option value="Roubo">Roubo</option>
                    <option value="Furto">Furto</option>
                    <option value="Injuria">Injúria</option>
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
