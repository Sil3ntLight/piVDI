import React from "react";

const VMList = ({ vms }) => {
    return (
        <div>
            <center><h1>Virtual Machines</h1></center>
            {vms.map((vm) => (
                <div class="card">
                <div class="card-body">
                    <h2 class="card-title">{vm.name}</h2>
                    <h3 class="card-subtitle mb-2 text-muted">{vm.description}</h3>
                    <p class="card-text">OS: {vm.osvariant} ({vm.ostype}) | RAM: {vm.ram} | Disk Size: {vm.disksize}</p> 
                </div>
                </div>
            ))}
        </div>
    );
}

export default VMList;