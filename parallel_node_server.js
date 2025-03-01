// we'll create multiple processes of the same nodeJS server
// this is done by using a library called 'cluster'
// basically, we'll create something like a 'cluster' of servers
// where all the server processes will listen to the same port 
// the primary server works as a load balancer, accepting all the requests
// and then it forwards those requests to the other servers, in round-robin fashion

import cluster from "cluster";
import os from "os";
import { app } from "./index";

// check how many cpu cores we have
const totalCPUs = os.cpus().length; 
const totalParallelism = os.availableParallelism();

// if the current process is primary, then create child processes
if (cluster.isPrimary) {    
    console.log(`totalCPUs = ${totalCPUs}`);
    console.log(`totalParallelism = ${totalParallelism}`);
    console.log(`Master or Primary Process running with pid: ${process.pid}`);
    console.log('Instantiating Child processes ...');
    for(let i=1; i<= totalCPUs; i++) {
        // spin up child processes, one for each cpu core
        cluster.fork();
    }
    console.log(`Child processes instantiation completed. Created ${totalCPUs} child processes`);
    // res.status(200).send(`Primary process with pid: ${process.pid}`);
} else {    
    // create a child express server here that'll handle user requests
    app.listen(3000, () => {
        console.log(`child server started at port 3000 with pid: ${process.pid}`);
    });
}