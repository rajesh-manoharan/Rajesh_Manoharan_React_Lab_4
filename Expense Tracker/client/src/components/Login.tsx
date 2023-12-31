import { FormEvent, useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import IUser from "../models/IUser";
import { getAllUserData, validateUser } from "../services/users-utils";

type Props = {
  setLogin: (valid: string) => void;
};

const Login = ({ setLogin }: Props) => {
  const [userData, setUserData] = useState<IUser[]>([]);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const getAllUserDataInvoker = async () => {
      const data = await getAllUserData();
      setUserData(data);
    };
    getAllUserDataInvoker();
  }, []);

  const validateLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = usernameRef?.current?.value as string;
    const password = passwordRef?.current?.value as string;
    setLogin(validateUser(username, password, userData) as string);
  };

  return (
    <Container className="my-5 d-flex justify-content-center align-items-center">
      <Form onSubmit={validateLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            ref={usernameRef}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordRef}
          />
        </Form.Group>
        <Button variant="dark" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Login;