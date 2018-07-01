$.global.register({
    // info
    name: "Switch",
    description: "A Simple switch (box, radio, slider)",
    author: "YourName",
    date: "@TODO",
    update: "@TODO",
    version: "@TODO",
    license: "@TODO",

    // config
    path: "components.switch", // optional assign path
    auto: false, // automatically instances the class to the path / default true

    // extensions / plugins
    plugins: [
    ],

    // instance
    instance: class c_Switch
        {
            constructor(args)
                {
                    // fires on registration before this.$ is available
                    // process args and check / defaults
                    if (!args){args = {}}
    
                    let spec = {
                        type: null,
                        label: null,
                        value: false,
                        hover: false,
                        callback: false, // callback for each click
                        true: false, // callback when true
                        false: false, // callback when false
                    };
    
                    $.append(args, spec, true);
    
                    return this.create.call($.components.label.prototype, spec);
                }

            registered () {
                this.stylesheet(); // create the stylesheet
            }

            create (args) {
                return (
                    $.create.div({
                            args: args,
                            ref: "switch",
                            refs: true,
                            id: args.id,
                            switchType: args.type,
                            value: args.value,
                            styler: [
                                "c-switch-container",
                                args.type === "radio" ? "c-switch-container-box/radio" : "",
                                args.type === "box" ? "c-switch-container-box/radio" : "",
                                args.type === "slider" ? "c-switch-container-slider" : "",
                                args.hover ? "event hover c-switch-hover-on/c-switch-hover-off" : null,
                                "event click add c-switch-handler",
                                [args.styler]
                            ]},

                        args.label ? $.create.p({
                            ref: "label",
                            textContent: args.label,
                            styler:
                                ["c-switch-label", [args.styler]]
                            }) : {},

                        $.create.div({ref: "outer",
                            styler: [
                                "c-switch-outer",
                                args.type === "radio" ? "c-switch-radio; c-switch-outer-box/radio" : "",
                                args.type === "box" ? "c-switch-box; c-switch-outer-box/radio" : "",
                                args.type === "slider" ? "c-switch-slider; c-switch-outer-slider" : "",
                                [args.styler]
                                ]
                            },
                            $.create.div({ref: "inner",
                                styler: [
                                    "c-switch-inner",
                                    args.type === "radio" ? "c-switch-radio;"
                                        +(args.value === true ? "c-switch-inner-on" : "c-switch-inner-off") : "",
                                    args.type === "box" ? "c-switch-box;"
                                        +(args.value === true ? "c-switch-inner-on" : "c-switch-inner-off") : "",
                                    args.type === "slider" ? "c-switch-slider; c-switch-inner-slider; c-switch-inner-on;"
                                        +(args.value === true ? "c-switch-slider-on" : "c-switch-slider-off") : "",
                                    [args.styler]
                                    ]
                                }
                            )
                        )
                    )
                )
            }

            stylesheet () {
                $.styler.create({
                    "c-switch-container": {
                        position: "relative",
                        display: "grid",
                        gridTemplateRows: "20px",
                        alignItems: "center",
                        padding: "2px",
                    },
                    "c-switch-container-box/radio": {
                        gridTemplateColumns: "auto 18px",
                    },
                    "c-switch-container-slider": {
                        gridTemplateColumns: "auto 36px",
                    },
                    "c-switch-label": {
                        position: "relative",
                        margin: "0px",
                        padding: "0px",
                        fontSize: "11pt",
                        fontFamily: "ubuntu, arial",
                        userSelect: $.prefix.bind("none"),
                    },
                    "c-switch-outer": {
                        position: "relative",
                        border: "1px solid gray",
                        display: "grid",
                        boxSizing: "border-box",
                        padding: "2px",
                    },
                    "c-switch-outer-box/radio": {
                        height: "18px",
                        width: "18px",
                    },
                    "c-switch-outer-slider": {
                        height: "18px",
                        width: "36px",
                    },
                    "c-switch-box": {
                        borderRadius: "2px",
                    },
                    "c-switch-radio": {
                        borderRadius: "50%",
                    },
                    "c-switch-slider": {
                        borderRadius: "18px",
                    },
                    "c-switch-inner": {
                        position: "relative",
                        top: "0px",
                        left: "0px",
                        width: "100%",
                        height: "100%",
                        transition: "background-color 150ms"
                    },
                    "c-switch-inner-slider": {
                        position: "relative",
                        width: "14px",
                        height: "100%",
                        transition: "left 150ms"
                    },
                    "c-switch-slider-on": {
                        left: "calc(100% - 14px)",
                    },
                    "c-switch-slider-off": {
                        left: "0px",
                    },
                    "c-switch-inner-on": {
                        backgroundColor: "black",
                    },
                    "c-switch-inner-off": {
                        backgroundColor: "transparent",
                    },
                    "c-switch-hover-on": {
                        backgroundColor: "lightgray",
                    },
                    "c-switch-hover-off": {
                        backgroundColor: "unset",
                    },
                    "c-switch-handler": {
                        f: (el) => {
                            if (el.switchType === "slider")
                                {
                                    if (el.value)
                                        {
                                            el.value = false;
                                            $.styler.set(el.refs.inner, "swap c-switch-slider-on/c-switch-slider-off");
                                        }
                                    else
                                        {
                                            el.value = true;
                                            $.styler.set(el.refs.inner, "swap c-switch-slider-off/c-switch-slider-on");
                                        }
                                }
                            else // check/radio
                                {
                                    if (el.value)
                                        {
                                            el.value = false;
                                            $.styler.set(el.refs.inner, "swap c-switch-inner-on/c-switch-inner-off");
                                        }
                                    else
                                        {
                                            el.value = true;
                                            $.styler.set(el.refs.inner, "swap c-switch-inner-off/c-switch-inner-on");
                                        }
                                }
    
                            if (el.value)
                                {
                                    if (el.args.true){el.args.true.call(el)}
                                }
                            else
                                {
                                    if (el.args.false){el.args.false.call(el)}
                                }
    
                            if (el.args.callback){el.args.callback.call(el)}
                        },
                    }
                });
            }
        }
});