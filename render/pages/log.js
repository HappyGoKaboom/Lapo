$.global.register({
    name: "log",

    // config
    path: "page.log", // optional assign path
    auto: false, // automatically instances the class to the path / default true

    // extensions / plugins
    plugins: [],

    // instance
    instance: class page_Log
        {
            constructor(args)
                {
                    // fires on registration before this.$ is available
                    return this.create.call(this, args);
                }

            registered()
                {
                    // fires when $.global.register is done so this.$ is available
                    this.style();
                }

            create(args)
                {
                    $.id.main.appendChild(
                        $.create.div({id: "log", show: this.show, hide: this.hide},
                            $.create.div({styler: "log-wrapper"},
                                // Project name, and types
                                $.create.div({id: "log-left-panel"},
                                    $.create.p({id: "log.info.name", textContent: "$.args.name", styler: "log-proj-name"}),
                                    $.create.div(),
                                    $.create.div(),
                                    ),
                                $.create.div({id: "log-main-panel"},
                                    $.create.div({styler: "log-out-wrap"},
                                        $.create.div({id: "logger.out", styler: "log-out"})
                                        )
                                    ),
                                $.create.div({id: "log-right-panel"},

                                    )
                            )
                        )
                    );
                }

            style(){
                $.styler.create({
                    "test-border": {
                        border: "1px solid red",
                        height: "100%",
                    },
                    "log-wrapper": {
                        display: "grid",
                        gridTemplateColumns: "20% 60% 20%",
                        gridTemplateRows: "100%",
                        height: "100%",
                    },
                    "#log-left-panel": {
                        gridColumnStart: 1,
                        gridRowStart: 1,
                        height: "100%",
                    },
                    "#log-main-panel": {
                        gridColumnStart: 2,
                        gridRowStart: 1,
                        height: "100%",
                    },
                    "#log-right-panel": {
                        gridColumnStart: 3,
                        gridRowStart: 1,
                        height: "100%",
                    },
                    "log-proj-name": {
                        margin: "12px",
                        paddingLeft: "24px",
                        fontSize: "16pt",
                        borderBottom: "1px solid gray"
                    },
                    "log-out-wrap": {
                        overflow: "hidden",
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        top: "0",
                        left: "0",
                    },
                    "log-out": {
                        overflowY: "scroll",
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        top: "0",
                        left: "0",
                    }
                })
            }

            show () {
                $.id.log.style.display = `initial`;
            }

            hide () {
                $.id.log.style.display = `none`;
            }
        }
});