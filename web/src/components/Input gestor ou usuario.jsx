import { FloatingLabel, Form } from "react-bootstrap";

export function SelectUsuarioGestorInput(props) {
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
                    <option value="usuarios">Usuário</option>
                    <option value="gestor">Gestor</option>
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

//Isso iria no register!

/* <SelectUsuarioGestorInput
className="mb-4"
label="Cargo"
type="text"
placeholder="Insira seu cargo."
error={errors.cargo}
required={true}
name="cargo"
validations={register('cargo', {
    required: {
        value: true,
        message: 'Cargo é obrigatório'
    }
})}
/> */