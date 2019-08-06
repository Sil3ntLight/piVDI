const express = require('express');
const app = express();
import bodyParser from 'body-parser';
import db from './db/db';
const { exec } = require('child_process');

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})


app.get('/api/v1/vms', (req, res) => {

	res.status(200).send({
	    success: 'true',
	    message: 'vms retrieved successfully',
	    vms: db
	})        
    

})

app.post('/api/v1/vms', (req, res) => {
    if(!req.body.name) {
        return res.status(400).send({
            success: 'false',
            message: 'Name is required'
        });
    } else if(!req.body.description) {
        return res.status(400).send({
            success: 'false',
            message: 'Description is required'
        });
    } else if(!req.body.ostype) {
        return res.status(400).send({
            success: 'false',
            message: 'OS Type is required'
        });
    } else if(!req.body.osvariant) {
        return res.status(400).send({
            success: 'false',
            message: 'OS Variant is required'
        });
    } else if(!req.body.ram) {
        return res.status(400).send({
            success: 'false',
            message: 'RAM amount is required'
        });
    } else if(!req.body.vcpus) {
        return res.status(400).send({
            success: 'false',
            message: '# of vCPUs is required'
        });
    } else if(!req.body.diskpath) {
        return res.status(400).send({
            success: 'false',
            message: 'Disk Path is required'
        });
    } else if(!req.body.disksize) {
        return res.status(400).send({
            success: 'false',
            message: 'Disk Size is required'
        });
    } else if(!req.body.graphics) {
        return res.status(400).send({
            success: 'false',
            message: 'Graphics Type is required'
        });
    } else if(!req.body.cdrom) {
        return res.status(400).send({
            success: 'false',
            message: 'Install ISO/CDROM is required'
        });
    } else if(!req.body.bridge) {
        return res.status(400).send({
            success: 'false',
            message: 'Network Bridge is required'
        });
    }

    const vm = {
        id: db.length + 1,
        name: req.body.name,
        description: req.body.description,
        ostype: req.body.ostype,
        osvariant: req.body.osvariant,
        ram: req.body.ram,
        vcpus: req.body.vcpus,
        diskpath: req.body.diskpath,
        disksize: req.body.disksize,
        graphics: req.body.graphics,
        cdrom: req.body.cdrom,
        bridge: req.body.bridge,
        state: req.body.state
    }

    const vmscript = exec(`virt-install --name ${req.body.name} --description \"${req.body.description}\" --os-type ${req.body.ostype} --ram ${req.body.ram} --vcpus ${req.body.vcpus} --disk path=${req.body.diskpath},bus=virtio,size=${req.body.disksize} --graphics ${req.body.graphics} --cdrom ${req.body.cdrom} --network bridge:${req.body.bridge}`, function(error, stdout, stderr) {
        console.log('stdout: ', stdout);
        console.log('stderr: ', stderr);
        if (error !== null) {
            return res.status(400).send({
                success: 'false',
                message: `create vm failed with: \n${stderr}`
            })
        } else {
            db.push(vm);
            return res.status(201).send({
                success: 'true',
                message: 'vm added successfully',
                vm
            })
        }
    })



})

app.get('/api/v1/vms/:name', (req, res) => {
    const name = req.params.name
    db.map((vm) => {
        if (vm.name === name) {
            return res.status(200).send({
                success: 'true',
                message: 'vm retrieval successful',
                vm,
            })
        }
    })

    return res.status(404).send({
        success: 'false',
        message: 'vm does not exist',
    })
})

app.put('/api/v1/vms/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    let vmFound;
    let itemIndex;
    db.map((vm, index) => {
        if (vm.id === id) {
            vmFound = vm;
            itemIndex = index;
        }
    })
    if (!vmFound) {
        return res.status(404).send({
            success: 'false',
            message: 'vm not found'
        })
    }
    if(!req.body.name) {
        return res.status(400).send({
            success: 'false',
            message: 'Name is required'
        });
    } else if(!req.body.description) {
        return res.status(400).send({
            success: 'false',
            message: 'Description is required'
        });
    } else if(!req.body.ostype) {
        return res.status(400).send({
            success: 'false',
            message: 'OS Type is required'
        });
    } else if(!req.body.osvariant) {
        return res.status(400).send({
            success: 'false',
            message: 'OS Variant is required'
        });
    } else if(!req.body.ram) {
        return res.status(400).send({
            success: 'false',
            message: 'RAM amount is required'
        });
    } else if(!req.body.vcpus) {
        return res.status(400).send({
            success: 'false',
            message: '# of vCPUs is required'
        });
    } else if(!req.body.diskpath) {
        return res.status(400).send({
            success: 'false',
            message: 'Disk Path is required'
        });
    } else if(!req.body.disksize) {
        return res.status(400).send({
            success: 'false',
            message: 'Disk Size is required'
        });
    } else if(!req.body.graphics) {
        return res.status(400).send({
            success: 'false',
            message: 'Graphics Type is required'
        });
    } else if(!req.body.cdrom) {
        return res.status(400).send({
            success: 'false',
            message: 'Install ISO/CDROM is required'
        });
    } else if(!req.body.bridge) {
        return res.status(400).send({
            success: 'false',
            message: 'Network Bridge is required'
        });
    }
    const updatedVm = {
        id: vmFound.id,
        name: req.body.name,
        description: req.body.description,
        ostype: req.body.ostype,
        osvariant: req.body.osvariant,
        ram: req.body.ram,
        vcpus: req.body.vcpus,
        diskpath: req.body.diskpath,
        disksize: req.body.disksize,
        graphics: req.body.graphics,
        cdrom: req.body.cdrom,
        bridge: req.body.bridge
    }
    db.splice(itemIndex, 1, updatedVm)
    return res.status(201).send({
        success: 'true',
        message: 'VM updated successfully',
        updatedVm
    })
})

app.delete('/api/v1/vms/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    db.map((vm, index) => {
        if (vm.id === id) {

            //delete vm storage file
            const dumpxml = exec(`virsh dumpxml --domain ${req.body.name} | grep 'source file' | awk -F "'" '{print $2}'`)
            var rmstorage;
            dumpxml.stdout.on("data", function(data){
                rmstorage = exec(`rm -rf ${data}`)
            })
            rmstorage.stderr.on("data", function(data) {
                console.log(data);
                return res.status(400).send({
                    success: 'false',
                    message: `VM storage could not be removed, error: ${data}`
                })
            })

            //shutdown vm
            const shutdownvm = exec (`virsh destroy ${req.body.name}`);
            
            shutdownvm.stderr.on("data", function(data) {
                console.log(data);
                return res.status(400).send({
                    success: 'false',
                    message: `VM could not be shutdown, error: ${data}`
                })
            })
            var undefinevm = exec(`virsh undefine ${name}`)
            undefinevm.stderr.on("data", function(data) {
                console.log(data);
                return res.status(400).send({
                    success: 'false',
                    message: `VM could not be destroyed, error: ${data}`
                })
            })
            db.splice(index, 1);
            return res.status(200).send({
                success: 'true',
                message: 'vm deleted successfully'
            })
        }
    })
    return res.status(404).send({
        success: 'false',
        message: 'vm not found',
    })
})



const PORT = 5000;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
