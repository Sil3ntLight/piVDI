import React, { Component } from "react";
import VMList from './VMList';
 
class VMs extends Component {
  state = {
    vms: []
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_SERVER_URL}api/v1/vms/`)
    .then(res => res.json())
    .then((data) => {
      this.setState({ vms: Array.from(data.vms) })
    })
    .catch(console.log)
  }
 
  render() {
    return(
      <VMList vms={this.state.vms} />
    )

  }
} 

export default VMs;