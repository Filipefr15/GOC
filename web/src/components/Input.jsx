import { FloatingLabel, Form } from "react-bootstrap";

export function Input(props) {
    const inputClasses = props.error ? "is-invalid" : "is-valid"; // Adicione a classe is-invalid se houver um erro

    return (
        <Form.Group className={props.className}>
            <FloatingLabel label={props.label}>
                <Form.Control
                    type={props.type}
                    placeholder={props.placeholder}
                    isInvalid={props.error}
                    required={props.required}
                    id={props.name}
                    name={props.name}
                    defaultValue={props.defaultValue}
                    {...props.validations}
                    className={inputClasses} // Adicione a classe is-invalid aqui
                />
                {props.error && (
                    <Form.Control.Feedback type="inputClasses">
                        {props.error.message}
                    </Form.Control.Feedback>
                )}
            </FloatingLabel>
        </Form.Group>
    );
}
