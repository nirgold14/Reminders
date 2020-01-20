import React, { useState, useEffect } from 'react'
import './RemindersList.css';
import Axios from 'axios';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, Row, Label, FormGroup, CardHeader, Table } from 'reactstrap'


function RemindersList(props) {

    const [data, setData] = useState([])

    const URL_GetAll = "https://localhost:44357/api/reminders/getReminders";
     useEffect(()=>{
         const getData = async () =>{
             const result = await Axios(URL_GetAll);  
             setData(result.data)
         }

         getData()
     })


    const EditReminder = (id) =>{
        props.history.push({  
            pathname: `/EditReminder/${id}`
          });  
    }

    const URL_Delete="https://localhost:44357/api/reminders/deleteReminder?id=";
    const DeleteReminder = (id) =>{
        Axios.delete(URL_Delete + id)  
      .then((result) => {  
        props.history.push('/RemindersList')  
      });  
    }

    return (
        <Container>
            <Row>     
                <Col>
                       
                    <Card className="table-card">
                        <CardHeader>My Reminders</CardHeader>
                        <CardBody>
                            <Table striped hover responsive size="sm">
                                <thead>
                                    <tr>
                                        <th width="10%">Subject</th>
                                        <th width="40%">Content</th>
                                        <th width="20%">Days Untill Alert</th>
                                        <th width="10%">Options</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((item, index) => {
                                            return <tr key={index} className="table-row">
                                                <td >{item.Subject}</td>
                                                <td>{item.Content}</td>
                                                <td>{item.DaysLeft}</td>
                                                <td>
                                                        <Button className="btn btn-warning" block onClick={()=>{EditReminder(item.Id)}}><span>Edit</span></Button>
                                                       <Button className="btn btn-danger" block onClick={()=>{DeleteReminder(item.Id)}}><span>Delete</span></Button>
                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                    </Col>  
            </Row>
        </Container>
    )
}

export default RemindersList;