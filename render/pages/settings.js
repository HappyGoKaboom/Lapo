$.global.register({
    name: "settings",

    // config
    path: "page.settings", // optional assign path
    auto: false, // automatically instances the class to the path / default true

    // extensions / plugins
    plugins: [],

    // instance
    instance: class page_Settings
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

            }

            style() {
                $.styler.create({

                });
            }
        }
});