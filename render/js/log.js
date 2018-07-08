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
        if ($.args.switchDirectory)
            {
                process.chdir($.args.directory);
            }

        let io = spawn($.args.run, $.args.argArray ? $.args.argArray : []);

        if ($.args.switchName)
            {
                $.id.log.info.name.textContent = $.args.name;
            }
        else
            {
                $.id.log.info.name.textContent = $.args.run;
            }

        io.stdout.on('data', this.out.bind(this));
        io.stderr.on('data', this.err.bind(this));
        io.on('close', this.exit.bind(this));
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
};

$.log = new $.log;