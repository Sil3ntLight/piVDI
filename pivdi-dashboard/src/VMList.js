import React from "react";

const VMList = ({ vms }) => {
    return (
        <div className="vm-list">
            <div className="vm-list_header">
                <h1 className="vm-list__header-title">Virtual Machines</h1>
                <div className="vm-list__buttons">
                    <button>New VM</button>
                    <button>Refresh List</button>
                </div>
            </div>
            <div className="vm-list_cards">
                {vms.map((vm) => (
                
                    <div className="vm-list__card-body">
                        
                            <h2 className="vm-list__card-title">{vm.name}</h2>
                            
                        
                        
                        <h3 className="vm-list__card-subtitle mb-2 text-muted">{vm.description}</h3>
                        <p className="vm-list__card-text">OS: {vm.osvariant} ({vm.ostype}) | RAM: {vm.ram} | Disk Size: {vm.disksize}</p> 
                    </div>
                    
                ))}    
                </div>
            
        </div>
    );
}

export default VMList;