# piVDI
VDI system for linux based thin clients and/or Raspberry Pi's for automatic connection

---

## Components

### Server:
The Server component handles all backend work, including:
- VM list database management through REST APIs
- Actions on VMs called from the Dashboard component
- OS commands (mostly for VM management)

This component uses Node.js with Express for APIs. Requires using babel-preset-es2015 which is installed (along with other dependencies) with the command `npm install`.

Server should be started with `npm run start` to start with Babel.

### Dashboard:
The Dashboard component creates a web-interface for management and monitoring of VMs and clients. Any system interactions and changes should be handled through this dashboard.

This component uses Node.js with React and react-router for page handling.

Dashboard should be started (for development) with `npm start`.


