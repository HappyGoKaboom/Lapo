$.global.register({
    name: "dashboard",

    // config
    path: "page.dashboard", // optional assign path
    auto: false, // automatically instances the class to the path / default true

    // extensions / plugins
    plugins: [],

    // instance
    instance: class page_Dashboard
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

            create(args) {
                // settings
                let textboxCols = "80px auto";

                // header - menu

                // main
                $.id.main.appendChild(
                    $.create.div(
                        {id: "dashboard", show: this.show, hide: this.hide},
                        $.create.div({
                                styler:"dash-start"
                            },
                            $.create.div({
                                    styler: "dash-mid"
                                },
                                new $.components.textbox({
                                    id: "dash.input.name",
                                    label: "Name",
                                    placeholder: "Optional name...",
                                    cols: textboxCols,
                                    events: {
                                        onchange: () => {}
                                    }
                                }),
                                new $.components.textbox({
                                    id: "dash.input.run",
                                    label: "Run",
                                    placeholder: "Run this...",
                                    cols: textboxCols,
                                    events: {
                                        onchange: () => {}
                                    }
                                }),
                                new $.components.textbox({
                                    id: "dash.input.args",
                                    label: "Args",
                                    placeholder: "With these...",
                                    cols: textboxCols,
                                    events: {
                                        onchange: () => {}
                                    }
                                }),
                                new $.components.textbox({
                                    id: "dash.input.log",
                                    label: "Log",
                                    placeholder: "Logs go where...",
                                    cols: textboxCols,
                                    events: {
                                        onchange: () => {}
                                    }
                                }),

                            ),
                            $.create.div({
                                    refs: true,
                                    events: {
                                        click: this.play
                                    },
                                    styler: [
                                        "dash-run",
                                        "event hover dash-run-hover-on/dash-run-hover-off",
                                    ]},
                                $.create.p({textContent: String.fromCharCode(9659), ref: "p",styler: "dash-run-text"})
                            )
                        ),
                        $.create.div({styler:"dash-line"}),
                        $.create.div({styler:"dash-recents"},
                            $.create.p({textContent: "Recents", styler: "dash-recents-label"})
                            ),
                    )
                );
            }

            style() {
                $.styler.create({
                    "dash-start": {
                        minHeight: "50%",
                        width: "100%",
                        display: "grid",
                        gridTemplateColumns: "30% 40% 30%",
                        gridTemplateRows: "30% auto auto",
                    },
                    "dash-line": {
                        background: "linear-gradient(90deg, transparent, #a4b3ca, transparent)",
                        height: "4px",
                        width: "80%",
                        left: "10%",
                    },
                    "dash-mid": {
                        gridColumnStart: 2,
                        gridRowStart: 2,
                        alignSelf: "center",
                    },
                    "dash-recents": {
                        display: "grid",
                        gridTemplateColumns: "10% 80% 10%",
                        gridTemplateRows: "10% 80% 10%",
                        height: "50%",
                    },
                    "dash-recents-label": {
                        textAlign: "center",
                        fontSize: "72pt",
                        letterSpacing: "108px",
                        color: "#cedaec",
                        gridColumnStart: 2,
                        gridRowStart: 2,
                    },
                    "dash-run": {
                        cursor: "pointer",
                        width: "80px",
                        height: "80px",
                        gridColumnStart: 2,
                        gridRowStart: 3,
                        justifySelf: "center",
                        border: "2px solid #a4b3ca",
                        borderRadius: "250px",
                        transition: $.prefix.bind("background-color 150ms"),
                        margin: "12px",
                    },
                    "dash-run-text": {
                        userSelect: $.prefix.bind("none"),
                        fontSize: "46pt",
                        textAlign: "center",
                        width: "100%",
                        height: "100%",
                        transform: "translate(5%, -11%)",
                        transition: $.prefix.bind("color 150ms"),
                    },
                    "dash-run-hover-off": {
                        f: (el) => {$.styler.set(el.refs.p, "dash-run-hover-text-off")},
                        backgroundColor: "white",
                    },
                    "dash-run-hover-on": {
                        f: (el) => {$.styler.set(el.refs.p, "dash-run-hover-text-on")},
                        backgroundColor: "#b8c4d6",
                    },
                    "dash-run-hover-text-off": {
                        color: "#6d85a9",
                    },
                    "dash-run-hover-text-on": {
                        color: "white",
                    }
                });
            }

            show () {
                $.id.dashboard.style.display = `initial`;
            }

            hide () {
                $.id.dashboard.style.display = `none`;
            }

            play () {
                $.id.dashboard.hide();
                $.id.log.show();

                $.args.name = $.id.dash.input.name.refs.input.value;
                $.args.run = $.id.dash.input.run.refs.input.value;
                $.args.arg = $.id.dash.input.args.refs.input.value;
                $.args.log = $.id.dash.input.log.refs.input.value;

                $.log.run();
            }
        }
});

