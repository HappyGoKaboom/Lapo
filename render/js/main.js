
const { ipcRenderer, remote} = require('electron');

window.addEventListener("DOMContentLoaded", ready);

$.argsv = remote.process.argv;

function processArgs () {
    let args = {
        // -n (name)
        switchName: false,
        name: null,

        // no switch (run)
        switchRun: false,
        run: null,

        // -l (log)
        switchLog: false,
        log: null,

        // -a (arg)
        switchArg: false,
        arg: null,

        // -s (auto start)
        switchStart: false,
        start: null,

        hasArgs: false,
    };

    $.argsv.map((v, k) => {
        if (k > 1)
            {
                let arg = v.trim();

                switch (arg)
                {
                    case "-l":
                        args.switchLog= true;
                        args.log = $.argsv[k+1];
                        args.hasArgs = true;
                        break;
                    case "-n":
                        args.switchName = true;
                        args.name = $.argsv[k+1];
                        args.hasArgs = true;
                        break;
                    case "-a":
                        args.switchArg = true;
                        args.argArray = $.argsv[k+1].split(" ");
                        args.argStr = $.argsv[k+1];
                        args.hasArgs = true;
                        break;
                    case "-s":
                        args.switchStart = true;
                        args.start = $.argsv[k+1];
                        args.hasArgs = true;
                        break;
                    case "-w":
                        args.switchDirectory= true;
                        args.directory = $.argsv[k+1];
                        args.hasArgs = true;
                        break;
                    default:
                        if (!args.switchRun)
                            {
                                args.switchRun = true;
                                args.run = arg;
                                args.hasArgs = true;
                            }
                        break;
                }
            }
    });

    $.args = args;
}

function ready() {
    processArgs();

    if ($.args.hasArgs)
        {
            if ($.args.switchLog)
                {
                    $.id.dash.input.log.refs.input.value = $.args.log;
                }

            if ($.args.switchRun)
                {
                    $.id.dash.input.run.refs.input.value = $.args.run;
                }

            if ($.args.switchArg)
                {
                    $.id.dash.input.args.refs.input.value = $.args.argStr;
                }

            if ($.args.switchName)
                {
                    $.id.dash.input.name.refs.input.value = $.args.name;
                }
        }
}