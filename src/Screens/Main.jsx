import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Alert } from 'reactstrap';
import '../css/main.css';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      Q: [],
      Qshow: 'Input number of states.',

      quadruplets: [],
      newQuadrupletF1: '',
      newQuadrupletF2: '',
      newQuadrupletF3: '',
      newQuadrupletF4: ''
    }
  }

  onChangeNumStates = (numStates) => {
    var Q = [];
    for (var i = 0; i < numStates; i++) {
      Q[i] = 'q'+i;
    }

    this.setState({ Q })
  };

  onShowStates = () => {
    var toShow = '';

    for (var i = 0; i < this.state.Q.length; i++) {
      toShow = toShow + this.state.Q[i] + ', ';
    }

    toShow = toShow.substring(0, toShow.length-2);
    this.setState({ Qshow: toShow });
  };

  onChangeQuadrupletf1 = () => {
    var re = /q[0-9]*(.)(.)q[0-9]*/;
    if (re.test(String(this.state.newQuadrupletF1).toLowerCase())) {
      this.onAddQuadruplet(this.state.newQuadrupletF1);
    } else {
      alert('wrong');
    }
  };

  onChangeQuadrupletf2 = () => {
    var re = /q[0-9]*(.)(R)q[0-9]*/;
    if (re.test(String(this.state.newQuadrupletF2).toLowerCase())) {
      this.onAddQuadruplet(this.state.newQuadrupletF2)
    } else {
      alert('wrong');
    }
  };

  onChangeQuadrupletf3 = () => {
    var re = /q[0-9]*(.)(L)q[0-9]*/;
    if (re.test(String(this.state.newQuadrupletF3).toLowerCase())) {
      this.onAddQuadruplet(this.state.newQuadrupletF3)
    } else {
      alert('wrong');
    }
  };

  onChangeQuadrupletf4 = () => {
    var re = /q[0-9]*(.)(q[0-9]*)q[0-9]*/;
    if (re.test(String(this.state.newQuadrupletF4).toLowerCase())) {
      this.onAddQuadruplet(this.state.newQuadrupletF4)
    } else {
      alert('wrong');
    }
  };

  onAddQuadruplet = (newQuadruplet) => {
    var quadruplets = this.state.quadruplets;
    if (!quadruplets.includes(newQuadruplet)) {
      quadruplets.push(newQuadruplet);
    }

    this.setState({ quadruplets });
  };

  render() {
    return (
      <div className="main-container">
        <header className="main-header">
          <h1 className="main-title">React Machine</h1>
          <p className="main-subtitle">A Turing Machine Simulator made with React and JS.</p>
        </header>
        <Container className="fill-data-fields">
          <Row>

            <Col>
              <div className="main-subcontainer">
                <div className="main-subcontainer-title">
                  Machine Definition
                </div>
                <Form inline>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="numstates" className="mr-sm-2">Number of states</Label>
                    <Input type="number" name="numstates" id="numstates" placeholder="# states"
                      onChange={(event) => this.onChangeNumStates(event.target.value)}/>
                  </FormGroup>
                  <Button onClick={ () => this.onShowStates() }>Set</Button>
                </Form>
                <Form inline>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="alphabet-input" className="mr-sm-2">Alphabet</Label>
                    <Input type="text" name="alphabet-input" id="alphabet-input" placeholder="Alphabet symbols" />
                  </FormGroup>
                  <Button>Set</Button>
                </Form>
              </div>

              <div className="main-subcontainer">
                <div className="main-subcontainer-title">
                  Quadruplets
                </div>
                <Form inline>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="quad-f1" className="mr-sm-2"><i>Form qiSjSkql</i></Label>
                    <Input type="text" name="quad-f1" id="quad-f1" placeholder="New quadruple"
                      onChange={(event) => this.setState({ newQuadrupletF1: event.target.value })}/>
                  </FormGroup>
                  <Button onClick={() => this.onChangeQuadrupletf1()}>Add</Button>
                </Form>
                <Form inline>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="quad-f2" className="mr-sm-2"><i>Form qiSjRql</i></Label>
                    <Input type="text" name="quad-f2" id="quad-f2" placeholder="New quadruple"
                      onChange={(event) => this.setState({ newQuadrupletF2: event.target.value })}/>
                  </FormGroup>
                  <Button onClick={() => this.onChangeQuadrupletf2()}>Add</Button>
                </Form>
                <Form inline>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="quad-f3" className="mr-sm-2"><i>Form qiSjLql</i></Label>
                    <Input type="text" name="quad-f3" id="quad-f3" placeholder="New quadruple"
                      onChange={(event) => this.setState({ newQuadrupletF3: event.target.value })}/>
                  </FormGroup>
                  <Button onClick={() => this.onChangeQuadrupletf3()}>Add</Button>
                </Form>
                <Form inline>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="quad-f4" className="mr-sm-2"><i>Form qiSjqkql</i></Label>
                    <Input type="text" name="quad-f4" id="quad-f4" placeholder="New quadruple"
                      onChange={(event) => this.setState({ newQuadrupletF4: event.target.value })}/>
                  </FormGroup>
                  <Button onClick={() => this.onChangeQuadrupletf4()}>Add</Button>
                </Form>
              </div>
            </Col>

            <Col>
              <div className="main-subcontainer">
                <div className="main-subcontainer-title">
                  States
                </div>
                <div>
                  <Alert color="primary">
                    { this.state.Qshow }
                  </Alert>
                </div>
              </div>

              <div className="main-subcontainer">
                <div className="main-subcontainer-title">
                  Quadruplets
                </div>
                <div>
                  {
                    this.state.quadruplets.map((quadruplet, index) => {
                      return(
                        <div>
                          { quadruplet }
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </Col>

          </Row>
        </Container>
      </div>
    );
  }
}

export default Main;
