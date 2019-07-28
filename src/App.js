import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    pattern: '((?=.*\\d)(?=.*[a-zA-Z]).{8,16})',
    inputs: {
      case1: 'password',
      case2: 'Password',
      case3: 'password1'
    }
  }

  handleChange = (event) => {
    if (event.target.name === 'pattern')
      this.setState({ pattern: event.target.value });
    else {
      this.setState({ inputs: {
        ...this.state.inputs,
        [event.target.name]: event.target.value
      } });
    }
  }

  match(str, pattern) {
    try {
      const re = new RegExp(pattern);
      console.log('valid pattern');
      return re.test(str);
    } catch (error) {
      console.error(error.message);
    }
  }

  render() {
    const { pattern, inputs } = this.state;
    return (
      <div className="App">
        <h1>regexp-app</h1>
        <label htmlFor="pattern">Pattern</label>
        <input value={pattern} name="pattern" onChange={this.handleChange} placeholder="Regular Expression" />
        <label htmlFor="case1">case1</label>
        <input value={inputs.case1} name="case1" onChange={this.handleChange} placeholder="Regular Expression" />
        <label htmlFor="case2">case2</label>
        <input value={inputs.case2} name="case2" onChange={this.handleChange} placeholder="Regular Expression" />
        <label htmlFor="case3">case3</label>
        <input value={inputs.case3} name="case3" onChange={this.handleChange} placeholder="Regular Expression" />
        <h2>Results</h2>
        <table>
          <thead>
            <tr>
              <th>Value</th>
              <th>Match?</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.state.inputs).map((str, i) =>
              <tr key={i}>
                <td>{this.state.inputs[str]}</td>
                <td>{this.match(this.state.inputs[str], pattern)
                  ? <span style={{color: 'green'}}>Yes</span>
                  : <span style={{color: 'red'}}>No</span>
                }</td>
              </tr>
            )}
          </tbody>
        </table>
        <h2>Examples</h2>
        <table>
          <thead>
            <tr>
              <th>Pattern</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>{`((?=.*\\d)(?=.*[a-zA-Z]).{8,16})`})</code></td>
              <td>
                At least one digit and at least one lowercase character (a-z), totalling at least 8 characters in length, no more than 16. Actually I'm not sure about the max length thing, doesn't seem to be supported everywhere?
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
