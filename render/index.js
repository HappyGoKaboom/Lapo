// ###########################      HTML        ###################################
function body () {
    // body of the document
    $.content = document.createDocumentFragment();

    // header
    $.content.appendChild(
        $.create.div({id: "header"},
            // header text
            $.create.div({id: "header-title"},
                $.create.p({textContent: "L", styler: ["header-title-big"]}),
                $.create.p({textContent: "og", styler: "header-title-small"}),
                $.create.p({textContent: "A", styler: "header-title-big"}),
                $.create.p({textContent: "nother", styler: "header-title-small"}),
                $.create.p({textContent: "P", styler: "header-title-big"}),
                $.create.p({textContent: "rograms", styler: "header-title-small"}),
                $.create.p({textContent: "O", styler: "header-title-big"}),
                $.create.p({textContent: "utput", styler: "header-title-small"}),
            ),

            // header menu
            $.create.div({}),

            // header options
            $.create.div({}),
        )
    );

    // main
    $.content.appendChild(
        $.create.div({id: "main"},

        )
    );

    // footer
    $.content.appendChild(
        $.create.div({id: "footer"},
        )
    );

    // content / pages
    new $.page.dashboard;
    new $.page.log;
    new $.page.settings;
}

// ###########################      STYLE        ###################################
$.styler.create({
    "@body": {
        overflow: "hidden",
        backgroundColor: "white",
        padding: "0",
        margin: "0",
    },
    "#header": {
        position: "absolute",
        borderBottom: "1px solid #97b1cc",
        top: "0",
        left: "0",
        width: "100%",
        height: "120px"
    },
    "#main": {
        position: "absolute",
        top: "120px",
        left: "0",
        width: "100%",
        height: "calc(100% - 120px - 40px)"
    },
    "#footer": {
        position: "absolute",
        borderTop: "1px solid #97b1cc",
        bottom: "0",
        left: "0",
        width: "100%",
        height: "40px"
    },
    "@div": {
        position: "relative",
    },
    "@p": {
        color: "#6d85a9",
        fontSize: "12pt",
        margin: "0px",
        padding: "0px",
        fontFamily: "Open Sans, arial",
    },
    "#header-title": {
        display: "grid",
        gridTemplateColumns: "26px 34px 32px 75px 29px 90px 36px auto",
        width: "400px",
        top: "50%",
        transform: "translateY(-50%)",
        left: "80px",
    },
    "header-title-big": {
        fontSize: "34pt",
        fontWeight: "bold",
        textDecoration: "line-through",
        textDecorationColor: "white"
    },
    "header-title-small": {
        fontStyle: "italic",
        fontSize: "14pt",
        color: "#a4b3ca",
        paddingTop: "20px",
    },
});

// ###########################      FUNCTIONAL        ###################################

// ###########################      DOM        ##########################################
window.addEventListener("DOMContentLoaded", ready, false);

function ready () {
    // The dom is ready for adding content ie. document.body (so appendChild() works)
    document.body.appendChild($.content);

    var remote = require('electron').remote;
    arguments = remote.getGlobal('sharedObject');
    console.log(arguments);
}

body(); // generate content
