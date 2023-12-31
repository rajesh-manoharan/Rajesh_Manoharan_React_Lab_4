import { FormEvent, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import IExpenseitem, { IExpenseCreateItem } from "../models/IExpenseitem";
import { getAllPayeeNames } from "../services/expense-utils";
import { createNewExpense } from "../services/expense-service";

type ExpenseCreatorModel = {
  expenseItems: IExpenseitem[];
  refresh: (newExpenseItem: IExpenseitem) => void;
};

const ExpenseCreator = ({ expenseItems, refresh }: ExpenseCreatorModel) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const descriptionRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const payeeRef = useRef<HTMLSelectElement>(null);

  const handleNewExpense = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const expenseDescription = descriptionRef?.current?.value as string;
    const payeeName = payeeRef?.current?.value as string;
    const price = Number(priceRef?.current?.value);
    const expenseDate = new Date(dateRef?.current?.value as string);

    if (
      typeof expenseDescription === "string" &&
      expenseDescription.trim().length === 0
    ) {
      return;
    }

    if (typeof payeeName === "string" && payeeName.trim().length === 0) {
      return;
    }

    if (typeof price === "number" && Number.isNaN(price)) {
      return;
    }

    console.log("Expense date type is ", typeof expenseDate);
    //   if (typeof expenseDate === 'string' && expenseDate.trim().length === 0) {
    //     return;
    //   }
    const newExpenseItem: IExpenseCreateItem = {
      expenseDescription: expenseDescription,
      payeeName: payeeName,
      price: price,
      date: expenseDate,
    };
    const response = await createNewExpense(newExpenseItem);
    refresh(response);
    handleClose();
  };

  const createExpenseModalBody = () => {
    return (
      <Form onSubmit={handleNewExpense}>
        <Form.Group className="mb-3" controlId="expenseDescription">
          <Form.Label>Expense Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter expense description"
            ref={descriptionRef}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide expense description.
          </Form.Control.Feedback>
        </Form.Group>
        <br></br>
        <Form.Group className="mb-3" controlId="payeeName">
          <Form.Label>Payee Name</Form.Label>

          <Form.Select
            aria-label="Default select example"
            ref={payeeRef}
            required
          >
            <option value="">SELECT A PAYEE</option>
            {getAllPayeeNames(expenseItems).map((payeeName) => {
              return <option value={payeeName}>{payeeName}</option>;
            })}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please provide payee name.
          </Form.Control.Feedback>
        </Form.Group>
        <br></br>
        <Form.Group className="mb-3" controlId="expensePrice">
          <Form.Label>Price</Form.Label>
          <Form.Control type="float" ref={priceRef} required />
          <Form.Control.Feedback type="invalid">
            Please provide expense price.
          </Form.Control.Feedback>
        </Form.Group>
        <br></br>
        <Form.Group className="mb-3" controlId="expenseDate">
          <Form.Label>Date of expense</Form.Label>
          <Form.Control type="date" ref={dateRef} required />
          <Form.Control.Feedback type="invalid">
            Please provide expense date.
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <span></span>
        <Button variant="dark" type="submit">
          New expense
        </Button>
      </Form>
    );
  };

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Add new expense
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>{createExpenseModalBody()}</Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default ExpenseCreator;