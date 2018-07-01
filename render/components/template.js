$.global.register({
    // info
    name: "NAME",

    // config
    path: "components.NAME", // optional assign path
    auto: false, // automatically instances the class to the path / default true

    // extensions / plugins
    plugins: [    ],

    // instance
    instance: class c_Switch
        {
            constructor(args)
                {
                    // fires on registration before this.$ is available
                    // process args and check / defaults
                    if (!args){args = {}}

                    let spec = {

                    };

                    $.append(args, spec, true);

                    return this.create.call($.components.label.prototype, spec);
                }

            registered () {
                this.stylesheet(); // create the stylesheet
            }

            create (args) {
                return (
                    $.create.div()
                )
            }

            stylesheet () {
                $.styler.create({


                });
            }
        }
});