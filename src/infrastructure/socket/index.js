'use strict';

const handlesocket = async (io) => {

    io.on("connection", (socket) =>{
        console.log("a user connected.");
        io.emit("welcome", "hello this is socket server");
    });
    
}