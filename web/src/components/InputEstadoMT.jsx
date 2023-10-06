import { FloatingLabel, Form } from "react-bootstrap";

export function SelectInputMT(props) {
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
                    <option value="MT">Mato Grosso</option>
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
