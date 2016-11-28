import React, { Component } from 'react';
import Clipboard from 'clipboard';

new Clipboard('button');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    App.context = this;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    let clippyStorage = localStorage.clippy
    if(clippyStorage != null) {
      App.context.setState({items: JSON.parse(clippyStorage).items})
    } else {
      App.context.setState({items: []})
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let items = this.state.items
    items.push(document.getElementById("name").value)
    App.context.setState({items: items})
    localStorage.clippy = JSON.stringify(this.state)
    document.getElementById("name").value = "";
    console.log("Submitted")
  }

  renderRow = (item, index) => {
    return <li key={index}>
        <button className="btn btn-xs btn-primary" data-clipboard-target={"#item-" + index}><i className="fa fa-clipboard"></i></button> &nbsp;
        <span id={"item-" + index}>{item}</span>
      </li>
  }

  render() {

    let rows = this.state.items.map((item, index) => {
      console.log(item, index)
      return this.renderRow(item, index)
    })

    return (
      <div className="container">
        <ul className="list list-unstyled">
          {rows}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <label>
            New Item:
            <input id="name" type="text" name="item" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default App;
