// function log(data) {
//     var text = $.create.p({textContent: decode(data)});
//     $id("log-output").appendChild(text);
// }
//
// // replace with parse (NEED TO PARSE£ LINE BREAKS)
function decode(arr) {
    return new TextDecoder("utf-8").decode(arr);
}

const { spawn } = require('child_process');
const { StringDecoder } = require('string_decoder');

$.log = class Log {
    run () {
        $.id("log-right-panel").innerHTML = "";
        $.id("logger.out").innerHTML = "";

        if ($.args.argArray && $.args.argArray.length > 0)
            {
                for (let i = 0; i < $.args.argArray.length; i++)
                    {
                        let item = $.args.argArray[i];
                        let val = $.create.p({textContent: item, styler: ["arg-value"]});

                        $.id("log-right-panel").appendChild(val);
                    }
            }

        if ($.args.switchDirectory)
            {
                process.chdir($.args.directory);
            }

        $.process = spawn($.args.run, $.args.argArray ? $.args.argArray : []);

        if ($.args.switchName)
            {
                $.id.log.info.name.textContent = $.args.name;
            }
        else
            {
                $.id.log.info.name.textContent = $.args.run;
            }

        $.process.stdout.on('data', this.out.bind(this));
        $.process.stderr.on('data', this.err.bind(this));
        $.process.on('close', this.exit.bind(this));
    }

    out (data) {
        this.parse(decode(data), 1);
    }

    err (data) {
        this.parse(decode(data), 2);
    }

    exit (data) {
        this.parse("Process terminated with code: " + data, 0);
    }

    parse (text, type) {
        let lines = text.split("\n");

        lines.map((v,k) => {
            let check = v.indexOf("[@");

            if (check > -1)
                {
                    // format output
                    let end = v.indexOf("]");
                    let data = v.slice(check+2, end).split(":");
                    let line = v.slice(end+1).trim();

                    if ($.parser[data[0]])
                        {
                            $.parser[data[0]](data, line, type);
                        }
                    else
                        {
                            $.parser["STANDARD"](data, line, type);
                        }
                }
            else
                {
                    // standard.js
                    $.parser["STANDARD"](null, v, type);
                }
        });

    }

    kill() {
        $.process.kill();
    }

    reRun () {
        $.process.kill();
        $.log.run();
    }
};

$.log = new $.log;