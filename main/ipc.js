// Main Process IPC
// Exports call function to Render process that allows the render process to call any function in the main process
exports.call = (call, args) => {
    try {
        global[call].call(null, args);
        } 
    catch (error) 
        {
        console.log("IPC.call Failed: " + call);
        }
}

exports.send = () => {
    win.webContents.send("abc1", "foo");
    win.webContents.send("abc2", "foo");
};

exports.withRendererCallback = (mapper) => {
    return "hello";
}
