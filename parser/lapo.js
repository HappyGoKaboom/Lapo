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
                        return $.create.p({textContent: ":--", styler: "parser-lineNumber"});
                    }
            }

            getFile (data) {
                if (data)
                    {
                        return $.create.p({textContent: data[1].slice(data[1].lastIndexOf("/")+1), styler: "parser-file"})
                    }
                else
                    {
                        return $.create.p({textContent: "--", styler: "parser-file"})
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
                        return $.create.p({textContent: "--", styler: "parser-time"});
                    }

            }

            STANDARD(data, line, type) {
                this.print($.create.p({textContent: line, styler: ["parser-standard","parser-text"]}), data);
            }

            LOG(data, line, type) {
                this.print($.create.p({textContent: line, styler: ["parser-log","parser-text"]}), data);
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

            /*
                Move the P Elements outside the container Div for the group, this displays the name,
                    change the margin to 8px on the left

                Sort the paths on the END function, it must take the current index and move to the previous one, this
                    becomes thge new target, depth accessor method.
             */

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
                this.indentPath.pop();
                this.target = this.indentPath.length > 0 ? this.indentPath[this.indentPath.length-1] : this.default;
                this.indent--;
            }

            TABLE_START(data, line, type) {
                let table = (
                    $.create.div({styler: "parser-table"},
                    )
                );

                this.print(table);
                this.target = table;
            }

            TABLE_END(data, line, type) {
                this.target = this.default;
            }

            JSON_START(data, line, type) {

            }

            JSON_END(data, line, type) {

            }

            style() {
                $.styler.create({
                    "parser-standard": {
                        color: "lightgray",
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
                        color: "gray",
                        fontSize: "12pt",
                        fontStyle: "italic",
                        margin: "0",
                        padding: "0",
                        fontFamily: "Open Sans, arial",
                    },
                    "parser-group": {
                        margin: "0px 20px",
                        borderLeft: "2px solid gray",
                        paddingLeft: "8px",
                        fontFamily: "Open Sans, arial",
                        borderBottom: "2px solid gray",
                        borderTop: "2px solid gray",
                    },
                    "parser-table": {
                        color: "green",
                        fontSize: "12pt",
                        fontStyle: "italic",
                        margin: "0",
                        padding: "0 0 0 40",
                        fontFamily: "Open Sans, arial",
                    },
                    "parser-line": {
                        display: "grid",
                        gridTemplateColumns: "10% 80% 6% 4%",
                    },
                    "parser-file": {
                        color: "darkblue",
                        gridColumnStart: 3,
                        gridRowStart: 1,
                    },
                    "parser-time": {
                        color: "blue",
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
                        color: "blue",
                        gridColumnStart: 4,
                        gridRowStart: 1,
                    },
                    "parser-group-label": {
                        padding: () => {return "0px 0px 0px " + ($.parser.indentSize + "px")},
                        marginLeft: "20px",
                    }
                });
            }
        }
});