import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Alert, Progress, Badge } from 'reactstrap';
import '../css/main.css';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      Q: [],
      Qshow: 'Input number of states.',

      quadruplets: [],
      quadsFirstTwo: [],
      newQuadrupletF1: '',
      newQuadrupletF2: '',
      newQuadrupletF3: '',
      newQuadrupletF4: '',

      alphabet: [],
      alphabetInput: '',
      alphabetShow: 'Input alphabet.',

      enableAlphabetInput: false,
      enableQuads: false,
      enableInput: false,

      machineInput: '',
      inputTape: [{index:0, symbol: 'Waiting for input', head: true}],

      acceptState: '',
      currentState: 'q0',
      currentTapeSymbol: '',
      accept: false,

      descriptions: []
    }
  }

  onChangeNumStates = (numStates) => {
    var Q = [];
    for (var i = 0; i < numStates; i++) {
      Q[i] = 'q'+i;
    }

    var acceptState = 'q' + (numStates-1);

    this.setState({ Q });
    this.setState({ acceptState });
  };

  onShowStates = () => {
    var toShow = '';

    for (var i = 0; i < this.state.Q.length; i++) {
      toShow = toShow + this.state.Q[i] + ', ';
    }

    toShow = toShow.substring(0, toShow.length-2);
    this.setState({ Qshow: toShow });
    this.setState({ enableAlphabetInput: true });
  };

  onChangeQuadrupletf1 = () => {
    var re = /q[0-9]*,(.),(.),q[0-9]*/;
    if (re.test(String(this.state.newQuadrupletF1).toLowerCase())) {
      // before calling func we have to check if quadruplets' symbols exist, and
      // the same with states

      // Only symbols in QF1 are in splits[1] and splits[2]
      var splits = this.state.newQuadrupletF1.split(',');

      if (this.state.alphabet.includes(splits[1]) && this.state.alphabet.includes(splits[2])
          && this.state.Q.includes(splits[0]) && this.state.Q.includes(splits[3])) {
        this.onAddQuadruplet(this.state.newQuadrupletF1);
      } else {
        alert('using invalid state and/or symbol');
      }
    } else {
      alert('malformed quadruplet');
    }
  };

  onChangeQuadrupletf2 = () => {
    var re = /q[0-9]*,.,R,q[0-9]*/;
    if (re.test(String(this.state.newQuadrupletF2))) {
      var splits = this.state.newQuadrupletF2.split(',');

      if (this.state.alphabet.includes(splits[1])
          && this.state.Q.includes(splits[0]) && this.state.Q.includes(splits[3])) {
        this.onAddQuadruplet(this.state.newQuadrupletF2);
      } else {
        alert('using invalid state and/or symbol');
      }
    } else {
      alert('malformed quadruplet');
    }
  };

  onChangeQuadrupletf3 = () => {
    var re = /q[0-9]*,.,L,q[0-9]*/;
    if (re.test(String(this.state.newQuadrupletF3))) {
      var splits = this.state.newQuadrupletF3.split(',');

      if (this.state.alphabet.includes(splits[1])
          && this.state.Q.includes(splits[0]) && this.state.Q.includes(splits[3])) {
        this.onAddQuadruplet(this.state.newQuadrupletF3);
      } else {
        alert('using invalid state and/or symbol');
      }
    } else {
      alert('malformed quadruplet');
    }
  };

  onChangeQuadrupletf4 = () => {
    var re = /q[0-9]*,(.),(q[0-9]*),q[0-9]*/;
    if (re.test(String(this.state.newQuadrupletF4).toLowerCase())) {
      var splits = this.state.newQuadrupletF4.split(',');

      if (this.state.alphabet.includes(splits[1]) && this.state.Q.includes(splits[2])
          && this.state.Q.includes(splits[0]) && this.state.Q.includes(splits[3])) {
        this.onAddQuadruplet(this.state.newQuadrupletF4);
      } else {
        alert('using invalid state and/or symbol');
      }
    } else {
      alert('malformed quadruplet');
    }
  };

  onAddQuadruplet = (newQuadruplet) => {
    var quadruplets = this.state.quadruplets;
    var quadsFirstTwo = this.state.quadsFirstTwo;

    var quadSplits = newQuadruplet.split(',');
    var firstTwo = quadSplits[0] + quadSplits[1];

    if (!quadsFirstTwo.includes(firstTwo)) {
      quadsFirstTwo.push(firstTwo);

      if (!quadruplets.includes(newQuadruplet)) {
        quadruplets.push(newQuadruplet);
      } else {
        alert('already added')
      }
    } else {
      alert('another quadruplet already has first two items')
    }

    this.setState({ quadruplets });
    this.setState({ quadSplits });
    this.setState({ enableInput: true });
  };

  onAddAlphabet = () => {
    var alphabetRaw = this.state.alphabetInput.replace(' ', '').split(',');
    var alphabet = alphabetRaw.filter(symbol => symbol.length === 1);
    alphabet.push("#");
    this.setState({ alphabet });

    var alphabetShow = '';

    for (var i = 0; i < alphabet.length; i++) {
      alphabetShow = alphabetShow + alphabet[i] + ', ';
    }

    alphabetShow = alphabetShow.substring(0, alphabetShow.length-2);
    this.setState({ alphabetShow });

    this.setState({ enableQuads: true });
  };

  removeQuadruplet = (quadruplet) => {
    var originalQuadruplets = this.state.quadruplets;
    var quadruplets = originalQuadruplets.filter(quad => quad !== quadruplet);
    this.setState({ quadruplets });
    console.log('new quadruplets', this.state.quadruplets);
  };

  onProcessInput = () => {
    // check if symbols are in alphabet
    var flag = true;
    var splits = this.state.machineInput.split('');
    for (var i = 0; i < splits.length; i++) {
      if (!this.state.alphabet.includes(splits[i])) {
        alert('invalid symbol inside input');
        flag = false;
        break;
      }
    }

    if (flag) {
      // continue processing
      console.log('splits', splits);
      var inputTape = splits.map((symbol, index) => {
        var head = false;
        if (index === 0) {
          head = true;
        }
        var x = {index: index, symbol: symbol, head: head};
        return x;
      });

      var last = { index: splits.length, symbol: '#', head: false };
      inputTape.push(last);

      var cursorTape = [];
      cursorTape.push('H');
      for (var i = 1; i < inputTape.length; i++) {
        cursorTape.push('');
      }

      this.setState({ cursorTape });

      console.log('inputTape', inputTape);
      this.setState({ inputTape });
      console.log('input tape in state', this.state.inputTape);
      this.setState({ accept: false });

      //this.simulate();
      //document.getElementById('btn-sim').click();
    }
  }

  simulate = () => {
    var x = document.getElementById('results');
    x.style.display = "block";

    var inputTape = this.state.inputTape;
    console.log('inputTape[0].symbol', inputTape[0].symbol);
    var currentTapeSymbol = inputTape[0].symbol;
    this.setState({ currentTapeSymbol: inputTape[0].symbol });

    var emptyDesc = this.state.descriptions;
    emptyDesc.splice(0,emptyDesc.length);
    this.setState({ descriptions: emptyDesc });

    var end = false;

    var currentState = this.state.currentState;
    console.log('currentState', currentState);

    var symbol = inputTape[0].symbol;
    console.log('symbol', symbol);

    while (!end) {
      // search for Quadruplets
      var quadruplet = '';
      var action = '';

      for (var i = 0; i < this.state.quadruplets.length; i++) {
        var splits = this.state.quadruplets[i].split(',');
        if (splits[0] === currentState &&
            splits[1] === symbol) {
          quadruplet = this.state.quadruplets[i];
          currentState = splits[3];
          this.setState({ currentState })
          action = splits[2];
          break;
        }
      }

      console.log('quadruplet', quadruplet);
      console.log('action', action);

      // handle action
      // R
      if (action === 'R') {
        // move tape right
        console.log('entering with action', action);

        // write description
        var qsplits = quadruplet.split(',');
        var descr = qsplits[0] + ", " + symbol + ", " + action + ", " + qsplits[3];
        var descriptions = this.state.descriptions;
        descriptions.push(descr);
        this.setState({ descriptions });

        var newInputTape = [];
        var lastHeadIndex = 0;
        for (var i = 0; i < inputTape.length; i++) {
          if (inputTape[i].head === true) {
            var x = {index: inputTape[i].index,
                      symbol: inputTape[i].symbol, head: false};
            lastHeadIndex = inputTape[i].index
            newInputTape.push(x);
          } else {
            newInputTape.push(inputTape[i]);
          }
        }

        console.log('lastHeadIndex', lastHeadIndex);
        console.log('newInputTape', newInputTape);

        var newInputTapeFix = [];
        for (var i = 0; i < newInputTape.length; i++) {
          if (newInputTape[i].index === lastHeadIndex + 1) {
            var x = {index: newInputTape[i].index,
                      symbol: newInputTape[i].symbol, head: true};
            this.setState({ currentTapeSymbol: newInputTape[i].symbol })
            currentTapeSymbol = newInputTape[i].symbol;
            symbol = newInputTape[i].symbol;
            console.log('currentTapeSymbol', this.state.currentTapeSymbol);
            console.log('currentTapeSymbol, not state', currentTapeSymbol);
            newInputTapeFix.push(x);
          } else {
            newInputTapeFix.push(newInputTape[i]);
          }
        }

        inputTape = newInputTapeFix;

        console.log('newInputTapeFix', newInputTapeFix);
        this.setState({ inputTape: newInputTapeFix });

        this.updateTape(inputTape);

      } else if (this.state.alphabet.includes(action)) {
        // write description
        var qsplits = quadruplet.split(',');
        var descr = qsplits[0] + ", " + symbol + ", " + action + ", " + qsplits[3];
        var descriptions = this.state.descriptions;
        descriptions.push(descr);
        this.setState({ descriptions });

        // make a replacement
        console.log('entering with action', action);
        var newInputTape = [];
        for (var i = 0; i < inputTape.length; i++) {
          if (inputTape[i].head === true) {
            var x = {index: inputTape[i].index,
                      symbol: action, head: true};
            this.setState({ currentTapeSymbol: action })
            currentTapeSymbol = action;
            symbol = action;
            newInputTape.push(x);
          } else {
            newInputTape.push(inputTape[i]);
          }
        }

        inputTape = newInputTape;
        console.log('newInputTape in change', inputTape);
        this.setState({ inputTape: inputTape });
        this.updateTape(inputTape);
      } else if(action === 'L') {
        // move tape left

        // write description
        var qsplits = quadruplet.split(',');
        var descr = qsplits[0] + ", " + symbol + ", " + action + ", " + qsplits[3];
        var descriptions = this.state.descriptions;
        descriptions.push(descr);
        this.setState({ descriptions });

        console.log('entering with action', action);
        var newInputTape = [];
        var lastHeadIndex = 0;
        for (var i = 0; i < inputTape.length; i++) {
          if (inputTape[i].head === true) {
            var x = {index: inputTape[i].index,
                      symbol: inputTape[i].symbol, head: false};
            lastHeadIndex = inputTape[i].index
            newInputTape.push(x);
          } else {
            newInputTape.push(inputTape[i]);
          }
        }

        console.log('lastHeadIndex', lastHeadIndex);
        console.log('newInputTape', newInputTape);

        var newInputTapeFix = [];
        for (var i = 0; i < newInputTape.length; i++) {
          if (newInputTape[i].index === lastHeadIndex - 1) {
            var x = {index: newInputTape[i].index,
                      symbol: newInputTape[i].symbol, head: true};
            this.setState({ currentTapeSymbol: newInputTape[i].symbol })
            currentTapeSymbol = newInputTape[i].symbol;
            symbol = newInputTape[i].symbol;
            console.log('currentTapeSymbol', this.state.currentTapeSymbol);
            console.log('currentTapeSymbol, not state', currentTapeSymbol);
            newInputTapeFix.push(x);
          } else {
            newInputTapeFix.push(newInputTape[i]);
          }
        }

        inputTape = newInputTapeFix;

        console.log('newInputTapeFix', newInputTapeFix);
        this.setState({ inputTape: newInputTapeFix });

        this.updateTape(inputTape);
      } else if (this.state.Q.includes(action)) {
        // write description
        var qsplits = quadruplet.split(',');
        var descr = qsplits[0] + ", " + symbol + ", " + action + ", " + qsplits[3];
        var descriptions = this.state.descriptions;
        descriptions.push(descr);
        this.setState({ descriptions });

        // move to new state
        currentState = action;
        this.setState({ currentState });
      }

      if (symbol === "#") {
        end = true;
        break;
      }

    }

    console.log('currentState', currentState);
    var acceptState = this.state.acceptState;

    if (currentState === acceptState) {
      console.log('accepted');
      currentState = 'q0';
      this.setState({ currentState: currentState, accept: true });
    } else {
      this.setState({ accept: false });
      console.log('rejected');
      currentState = 'q0';
      this.setState({ currentState: currentState, accept: false });
    }

  };

  updateTape = (inputTape) => {
    this.setState({ inputTape });
    this.sleep(0);
  };

  sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

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
              <Form inline>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <Label for="machine-input" className="mr-sm-2">Input</Label>
                  <Input type="text" name="machine-input" id="machine-input" placeholder="Enter input"
                    onChange={(event) => this.setState({machineInput: event.target.value})}
                    disabled={!this.state.enableInput}/>
                </FormGroup>
                <Button color="success" disabled={!this.state.enableInput} onClick={ () => this.onProcessInput() }>Load Tape</Button>
                <Button id="btn-sim" color="success" disabled={!this.state.enableInput} onClick={ () => this.simulate() }>Simulate</Button>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col xs="3"></Col>
            <Col className="main-input-tape-container" xs="auto">
              {
                this.state.inputTape.map((element) => {
                  if (element.head === true) {
                    return(
                      <div className="main-input-tape-head" key={element.index}>
                        { element.symbol }
                      </div>
                    )
                  } else {
                    return(
                      <div className="main-input-tape" key={element.index}>
                        { element.symbol }
                      </div>
                    )
                  }

                })
              }
            </Col>
            <Col xs="3"></Col>
          </Row>
          <Row className="main-results-div" id="results">
            <Col xs="3"></Col>
            <Col className="main-input-tape-container" xs="3">
              {
                (this.state.accept === true)? (<Alert color="success">Input accepted!</Alert>) :
                  (<Alert color="danger">Input rejected.</Alert>)
              }
            </Col>
            <Col className="main-input-tape-container" xs="3">
            <div>
              {
                this.state.descriptions.map((descr, index) => {
                  return(
                    <div className="main-descr-div" key={index}>
                      { descr }
                    </div>
                  )
                })
              }
            </div>
            </Col>
            <Col xs="3"></Col>
          </Row>
        </Container>

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
                    <Input type="text" name="alphabet-input" id="alphabet-input" placeholder="Alphabet symbols"
                      onChange={ event => this.setState({ alphabetInput: event.target.value }) }
                      disabled={!this.state.enableAlphabetInput}/>
                  </FormGroup>
                  <Button disabled={!this.state.enableAlphabetInput} onClick={ () => this.onAddAlphabet() }>Set</Button>
                </Form>
              </div>

              <div className="main-subcontainer">
                <div className="main-subcontainer-title">
                  Quadruplets
                </div>
                <Form inline>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="quad-f1" className="mr-sm-2"><i>Form qiSjSkql</i></Label>
                    <Input type="text" name="quad-f1" id="quad-f1" placeholder="New quadruplet"
                      onChange={(event) => this.setState({ newQuadrupletF1: event.target.value })}
                      disabled={!this.state.enableQuads}/>
                  </FormGroup>
                  <Button disabled={!this.state.enableQuads} onClick={() => this.onChangeQuadrupletf1()}>Add</Button>
                </Form>
                <Form inline>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="quad-f2" className="mr-sm-2"><i>Form qiSjRql</i></Label>
                    <Input type="text" name="quad-f2" id="quad-f2" placeholder="New quadruplet"
                      onChange={(event) => this.setState({ newQuadrupletF2: event.target.value })}
                      disabled={!this.state.enableQuads}/>
                  </FormGroup>
                  <Button disabled={!this.state.enableQuads} onClick={() => this.onChangeQuadrupletf2()}>Add</Button>
                </Form>
                <Form inline>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="quad-f3" className="mr-sm-2"><i>Form qiSjLql</i></Label>
                    <Input type="text" name="quad-f3" id="quad-f3" placeholder="New quadruplet"
                      onChange={(event) => this.setState({ newQuadrupletF3: event.target.value })}
                      disabled={!this.state.enableQuads}/>
                  </FormGroup>
                  <Button disabled={!this.state.enableQuads} onClick={() => this.onChangeQuadrupletf3()}>Add</Button>
                </Form>
                <Form inline>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="quad-f4" className="mr-sm-2"><i>Form qiSjqkql</i></Label>
                    <Input type="text" name="quad-f4" id="quad-f4" placeholder="New quadruplet"
                      onChange={(event) => this.setState({ newQuadrupletF4: event.target.value })}
                      disabled={!this.state.enableQuads}/>
                  </FormGroup>
                  <Button disabled={!this.state.enableQuads} onClick={() => this.onChangeQuadrupletf4()}>Add</Button>
                </Form>
              </div>
            </Col>

            <Col>
              <div className="main-subcontainer">
                <div className="main-subcontainer-title">
                  States
                </div>
                <div>
                  <Alert color="secondary" className="main-show">
                    { this.state.Qshow }
                  </Alert>
                </div>
              </div>

              <div className="main-subcontainer">
                <div className="main-subcontainer-title">
                  Alphabet
                </div>
                <div>
                  <Alert color="secondary" className="main-show">
                    { this.state.alphabetShow }
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
                        <Button color="success" onClick={ () => this.removeQuadruplet(quadruplet) } key={index} id="#quad-el">
                          { quadruplet }
                        </Button>
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
