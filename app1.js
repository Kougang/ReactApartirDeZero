import React, { Component } from 'react'

class Home1 extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            nom: 'jean'
        }
        this.handleChange = this.handleChange().bind(this)
    }

    handleChange(e)
    {
        this.setState({
            nom: e.target.value
        })
    }


  render() {
    return (
      <div>
        <label htmlFor='nom'>Nom</label>
        <input type='text' id='nom' name='nom' value = {this.state.nom} onChange={this.handleChange}></input>

      </div>
    )
  }
}

ReactDOM.render(<Home1/>, document.querySelector('#app1'))
