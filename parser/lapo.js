$.global.register({
    // info
    name: "lapoParser",
    description: "Default parser that comes with lapo",
    author: "YourName",
    date: "@TODO",
    update: "@TODO",
    version: "@TODO",
    license: "@TODO",

    // config
    path: "parser", // optional assign path
    auto: true, // automatically instances the class to the path / default true

    // instance
    instance: class Lapo_Parser
        {
            constructor()
            {
                // fires on registration before this.$ is available
            }

            registered()
            {
                // fires when $.global.register is done so this.$ is available
                this.style();
                this.default = $.id.logger.out;
                this.target = this.default;
                this.indent = 0;
                this.indentSize = 24; // 24 px indents
                this.indentPath = [];
                this.mode = null;
                this.argsm = null;
                this.last = null;
            }

            /*
            [@LOG:/home/unknown/CLionProjects/lapo/main.cpp:10:1530212251776] A typical output line
            [@WARN:/home/unknown/CLionProjects/lapo/main.cpp:11:1530212251776] This is an warning
            [@ERROR:/home/unknown/CLionProjects/lapo/main.cpp:12:1530212251776] This is an error
            [@INFO:/home/unknown/CLionProjects/lapo/main.cpp:13:1530212251776] This is some information
            [@COMMENT:/home/unknown/CLionProjects/lapo/main.cpp:14:1530212251776] This is a comment

            [@GROUP_START:/home/unknown/CLionProjects/lapo/main.cpp:17:1530212251776] (A GROUP)
            [@LOG:/home/unknown/CLionProjects/lapo/main.cpp:18:1530212251776] This belongs to A GROUP
            [@GROUP_START:/home/unknown/CLionProjects/lapo/main.cpp:20:1530212251776] (SUB GROUP)
            [@LOG:/home/unknown/CLionProjects/lapo/main.cpp:21:1530212251776] This belongs to a SUB GROUP
            [@GROUP_END:/home/unknown/CLionProjects/lapo/main.cpp:22:1530212251776] (SUB GROUP)

            [@LOG:/home/unknown/CLionProjects/lapo/main.cpp:24:1530212251776] Just a line after the SUB GROUP
            [@GROUP_END:/home/unknown/CLionProjects/lapo/main.cpp:25:1530212251776] (A GROUP)

            [@TABLE_START:/home/unknown/CLionProjects/lapo/main.cpp:28:1530212251776] (My Table,4,,)
            [@TABLE_END:/home/unknown/CLionProjects/lapo/main.cpp:29:1530212251776] (My Table)

            [@JSON_START:/home/unknown/CLionProjects/lapo/main.cpp:32:1530212251776]
            [{val: 5}]
            [@JSON_END]

            (4) ["LOG", "/home/unknown/CLionProjects/lapo/main.cpp", "10", "1530219060113"]
                    0:"LOG"
                    1:"/home/unknown/CLionProjects/lapo/main.cpp"
                    2:"10"
                    3:"1530219060113"
                    length:4
            */

            print (item, data = null) {
                this.target.appendChild($.create.div({styler: "parser-line"},
                    this.getTime(data),
                    item,
                    this.getFile(data),
                    this.getLineNumber(data),
                    )
                );
            }

            add (item) {
                this.target.appendChild($.create.div({styler: "parser-line-nf"},
                    item,
                    )
                );
            }

            getLineNumber(data) {
                if (data)
                    {
                        return $.create.p({textContent: ":"+data[2], styler: "parser-lineNumber"});
                    }
                else
                    {
                        return $.create.p({textContent: "", styler: "parser-lineNumber"});
                    }
            }

            getFile (data) {
                if (data)
                    {
                        return $.create.p({textContent: data[1].slice(data[1].lastIndexOf("/")+1), styler: "parser-file"})
                    }
                else
                    {
                        return $.create.p({textContent: "", styler: "parser-file"})
                    }
            }

            getTime (data) {
                if (data)
                    {
                        let date = new Date(parseInt(data[3]));
                        let time = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2);
                        return $.create.p({textContent: time, styler: "parser-time"});
                    }
                else
                    {
                        return $.create.p({textContent: "", styler: "parser-time"});
                    }

            }

            STANDARD(data, line, type) {
                this.print($.create.p({textContent: line, styler: ["parser-standard","parser-text"]}), data);
            }

            LOG(data, line, type) {
                if (this.mode === "table")
                    {
                        let arr = line.split(this.argsm[2]);
                        let columns = document.createDocumentFragment();
                        let index = 0;

                        for (let i = 0; i < arr.length; i++)
                            {
                                let item = arr[i];

                                if (index > this.argsm[1])
                                    {
                                        index = 0;
                                    }

                                let target = this.target.children[index];

                                    target.appendChild(
                                        $.create.p({textContent: item, styler: ["parser-log", "parser-text"]})
                                    );

                                index++;
                            }

                        // this.print(
                        //     $.create.div(
                        //         {styler: "table-cols",style: {gridTemplateColumns: "repeat(" + this.argsm[1] + ", auto)"}},
                        //         columns,
                        // ), data);
                    }
                else
                    {
                        this.print($.create.p({textContent: line, styler: ["parser-log", "parser-text"]}), data);
                    }
            }

            WARN(data, line, type) {
                this.print($.create.p({textContent: line, styler: ["parser-warn","parser-text"]}), data);
            }

            ERROR(data, line, type) {
                this.print($.create.p({textContent: line, styler: ["parser-error","parser-text"]}), data);
            }

            INFO(data, line, type) {
                this.print($.create.p({textContent: line, styler: ["parser-info","parser-text"]}), data);
            }

            COMMENT(data, line, type) {
                this.print($.create.p({textContent: line, styler: ["parser-comment","parser-text"]}), data);
            }

            EXIT(data, line, type) {
                this.print($.create.p({textContent: line, styler: ["parser-exit","parser-text"]}), data);
            }

            GROUP_START(data, line, type) {
                this.target.appendChild(
                    $.create.p({styler: "parser-group-label", textContent: line}),
                );

                let group = (
                    $.create.div({styler: "parser-group"})
                );

                this.target.appendChild(group);
                this.indentPath.push(group);
                this.target = this.indentPath[this.indentPath.length-1];
                this.indent++;
            }

            GROUP_END(data, line, type) {
                this.mode = null;
                this.indentPath.pop();
                this.target = this.indentPath.length > 0 ? this.indentPath[this.indentPath.length-1] : this.default;
                this.indent--;
            }

            TABLE_START(data, line, type) {
                this.mode = "table";

                let args = line.replace(/[()]/g, "").split(",");

                if (args.length > 3)
                    {
                        args[2] = ",";
                        args.pop();
                    }

                args[1] = parseInt(args[1]) -1;

                this.argsm = args;

                this.target.appendChild(
                    $.create.p({styler: "parser-table-label", textContent: args[0]}),
                );

                let table = (
                    $.create.div({styler: "parser-table", style: {gridTemplateColumns: "repeat("+ parseInt(args[1])-1 +", auto)" } })
                );

                for (let i = 0; i < args[1] +1; i++)
                {
                    table.appendChild($.create.div({
                        style: {
                            gridColumnStart: i+1,
                        }
                    }))
                }

                this.target.appendChild(table);
                this.indentPath.push(table);
                this.target = this.indentPath[this.indentPath.length-1];
                this.indent++;
            }

            TABLE_END(data, line, type) {
                this.mode = null;
                this.indentPath.pop();
                this.target = this.indentPath.length > 0 ? this.indentPath[this.indentPath.length-1] : this.default;
                this.indent--;
            }

            JSON_START(data, line, type) {

            }

            JSON_END(data, line, type) {

            }

            style() {
                $.styler.create({
                    "parser-standard": {
                        color: "light#6d85a9",
                        fontSize: "12pt",
                        margin: "0",
                        padding: "0",
                        fontFamily: "Open Sans, arial",
                    },
                    "parser-log": {
                        color: "#6d85a9",
                        fontSize: "12pt",
                        margin: "0",
                        padding: "0",
                        fontFamily: "Open Sans, arial",
                    },
                    "parser-warn": {
                        color: "orangered",
                        fontSize: "12pt",
                        margin: "0",
                        padding: "0",
                        fontFamily: "Open Sans, arial",
                    },
                    "parser-error": {
                        color: "red",
                        fontSize: "12pt",
                        margin: "0",
                        padding: "0",
                        fontFamily: "Open Sans, arial",
                    },
                    "parser-info": {
                        color: "lightblue",
                        fontSize: "12pt",
                        margin: "0",
                        padding: "0",
                        fontFamily: "Open Sans, arial",
                    },
                    "parser-comment": {
                        color: "#6d85a9",
                        fontSize: "12pt",
                        fontStyle: "italic",
                        margin: "0",
                        padding: "0",
                        fontFamily: "Open Sans, arial",
                    },
                    "parser-group": {
                        margin: "0px 0px 0px 20px",
                        borderLeft: "1px solid #6d85a9",
                        paddingLeft: "8px",
                        fontFamily: "Open Sans, arial",
                        marginBottom: "4px",
                        // borderBottom: "1px solid #edf3f9",
                        // borderTop: "1px solid #6d85a9",
                        // borderRight: "1px solid #edf3f9",
                        // backgroundColor: "#edf3f9",
                    },
                    "parser-table": {
                        border: "1px solid #6d85a9",
                        color: "green",
                        fontSize: "12pt",
                        fontStyle: "italic",
                        margin: "0px 8px",
                        padding: "4px 8px 4px 40px",
                        fontFamily: "Open Sans, arial",
                        backgroundColor: "#edf3f9",
                        display: "grid",
                        width: "fit-content",
                    },
                    "parser-line": {
                        display: "grid",
                        gridTemplateColumns: "10% auto min-content min-content",
                        padding: "0px 4px",
                    },
                    "parser-file": {
                        color: "#848484",
                        gridColumnStart: 3,
                        gridRowStart: 1,
                    },
                    "parser-time": {
                        color: "#848484",
                        gridColumnStart: 1,
                        gridRowStart: 1,
                    },
                    "parser-text": {
                        gridColumnStart: 2,
                        gridRowStart: 1,
                        paddingLeft: "12px",
                        marginLeft: "20px",
                    },
                    "parser-group-end": {
                        gridColumnStart: 2,
                        gridRowStart: 1,
                        paddingLeft: "12px",
                        marginLeft: "20px",
                    },
                    "parser-lineNumber": {
                        fontSize: "10pt",
                        color: "#314273",
                        gridColumnStart: 4,
                        gridRowStart: 1,
                        padding: "0",
                        marginLeft: "2px",
                    },
                    "parser-group-label": {
                        padding: () => {return "0px 0px 0px " + ($.parser.indentSize + "px")},
                        borderBottom: "1px solid #6d85a9",
                        borderTopRightRadius: "25px",
                        borderBottomLeftRadius: "12.5px",
                        borderLeftWidth: "1px",
                        margin: "4px 2px 0px 10px",
                        backgroundColor: "#e9ecf9",
                    },
                    "table-cols": {
                        display: "grid",
                        justifyContent: "space-evenly",
                    }
                });
            }
        }
});