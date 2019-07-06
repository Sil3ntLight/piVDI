#!/bin/bash

# kvm-install - Script to setup a new VirtualMachine with VNC ready for install

##### CONSTANTS
ethLink=""

##### FUNCTIONS
check_kvm()
{
    echo "Checking for KVM Capability..."
    
    if [ "$(egrep  '(vmx|svm)' --color=always /proc/cpuinfo)" -gt "0" ]; then
        echo "KVM capability is enabled!"
    else
        echo "ERROR: KVM capability is not available..."
        echo "Please enable Intel Virtualization (and VT-d if available) in BIOS."
        exit 1
    fi

    echo "Checking for libvirt..."

    apt install -y kvm qemu-kvm libvirt-bin virtinst

    
}

create_bridge()
{
    echo "Checking for network utilities..."
    apt install -y ip

    echo "Creating bridge vmbr0..."
    echo
    echo "Please enter the physical network device (i.e. eth0)"
    read ethLink
    if [ -z $(cat /etc/network/interfaces | grep "iface vmbr0") ]; then
        echo
        "iface vmbr0 inet dhcp
    bridge_ports    $ethLink
    bridge_stp      off
    bridge_maxwait  0
    bridge_fd       0" >>  /etc/network/interfaces
        /etc/init.d/networking restart
        echo "Bridge vmbr0 created!"
    else
        echo "Error: vmbr0 already defined..."
        echo "Edit /etc/network/interfaces and remove vmbr0 section."
        exit 1
    fi     
    
}

create_vm()
{
    
    if [ $# -ne 11]; then
        echo "ERROR: Please pass in (ordered): 1. VM-Name, 2. Description, 3. OS-Type, 4. OS-Variant, 5. RAM-mb, 6. vCPUs, 7. disk path, 8. disk size, 9. graphics type, 10. Install CDRom, and 11. Network Bridge."
    else
        
        virt-install \
        -n $1 \
        --description $2 \
        --os-type=$3 \
        --os-variant=$4 \
        --ram=$5 \
        --vcpus=$6 \
        --disk path=$7,bus=virtio,size=$8 \
        --graphics $9 \
        --cdrom $10 \
        --network bridge:$11
    fi

}

##### MAIN

case "$1" in
    help)
        cat <<- END
            FLAGS:
            ------
            check = determine capability and install kvm utils
            create-bridge = make new networking bridge for kvm usage
            create-vm = Install new vm

            CREATE-VM OPTIONS:
            ------------------
            usage: sudo kvm-install.sh create-vm [vmName] [vmDescription] [OS Type] [OS Variant] [RAM MB] [# of vCPUs] [disk file path] [new disk size] [graphics type (spice, vnc, none)] [Install ISO] [Network Bridge]
END
        ;;
    
    check)
        check_kvm
        ;;

    create-bridge)
        create_bridge
        ;;

    create-vm)
        create_vm $2 $3 $4 $5 $6 $7 $8 $9 $10 $11 $12
        ;;

        
