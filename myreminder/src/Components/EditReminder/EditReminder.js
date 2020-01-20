import React,{useState, useEffect} from 'react'
import './EditReminder.css';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, Row, Label, FormGroup } from 'reactstrap'
import Axios from 'axios';


function EditReminder (props){

    const [reminder, setReminder] = useState({
        Id:'',
        Subject: '',
        Content: '',
        DaysLeft: ''
    })

     const URL_GetByID = "https://localhost:44357/api/reminders/getReminder?id=" + props.match.params.id;
    
     useEffect(()=>{
         const getData = async () =>{
           const result =  await Axios.get(URL_GetByID)
             setReminder(result.data)
         }

         getData();
     },[])

    const URL_Create = "https://localhost:44357/api/reminders/createRemind"
    const updateReminder = (e) => {
        e.preventDefault();  
        const data={
            Id:props.match.params.id, 
            Subject: reminder.Subject,
            Content: reminder.Content,
            DaysLeft: reminder.DaysLeft
        }
        props.history.push('/RemindersList')
          Axios.post(URL_Create,data)
          .then((result)=>{
              props.history.push('/RemindersList')

          })
    }

    const onChange= (e) =>{
        e.persist();       
        setReminder({...reminder, [e.target.name]: e.target.value});  
    }

    const clearForm= (e) =>{
        e.preventDefault();
        setReminder({
            Id:props.match.params.id, 
            Subject: "",
            Content: "",
            DaysLeft:""
        })
    }

    return(
       
        <Container>
        <Row >
            <Col>
                <Card>
                    <CardBody>
                        <Form onSubmit={updateReminder} >
                            <h2 className="form-Header">Update Reminder: </h2>
                            <FormGroup row className="align-items-center justify-content-center">
                                <Col md={2}>
                                    <h6>Subject: </h6>
                                </Col>
                                <Col md={6}>
                                    <Input type="select" name="Subject" value={reminder.Subject} onChange={ onChange } >
                                        <option value=""hidden>Subject</option>
                                        <option>Netflix</option>
                                        <option>Friends</option>
                                        <option>Events</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row className="align-items-center justify-content-center">
                                <Col md={2} >
                                    <h6>Content: </h6>
                                </Col>
                                <Col md={6}>
                                    <Input type="textarea" name="Content" value={reminder.Content} onChange={ onChange } />
                                </Col>                                    
                            </FormGroup>
                            <FormGroup row className="align-items-center justify-content-center">
                                <Col md={2}>
                                    <h6>Days Untill Alert: </h6>
                                </Col>
                                <Col md={6}>
                                    <Input type="number" name="DaysLeft" value={reminder.DaysLeft} onChange={ onChange } />
                                </Col>                                    
                            </FormGroup>


                            <CardFooter>
                                    <Row>
                                        <Col >
                                            <Button type="submit" size="lg" className="btn btn-success" block><span>Create</span></Button>
                                        </Col>
                                        <Col >
                                            <Button className="btn btn-danger" size="lg" block onClick={clearForm}><span>Clear</span></Button>
                                        </Col>

                                    </Row>
                                </CardFooter>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </Container>
    
    )
}

export default EditReminder;