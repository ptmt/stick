var stick = require("stick");
var Application = stick.Application, helpers = stick.helpers;

var response = require("stick/lib/utils/response");

function resolve(n) {
	return module.resolve ? module.resolve(n) : require.resolve(n.charAt(0) != '.' ? './' + n : n)
}

var app = exports.app = Application(),
    foo = resolve("foo"),
    bar = resolve("bar");

app.configure("mount", "route");
app.mount("/foo", foo);
app.mount("/bar", bar);

app.get("/", function(req) {
    return response.html("<html><body><h1>Mount/Route middleware demo</h1>",
        "<p>This app demos the composition and linking capabilities of the mount and route middleware. ",
        "Some links: </p>",
        "<ul>",
            "<li>", helpers.linkTo(foo), "</li>",
            "<li>", helpers.linkTo(bar, {name: "hello"}), "</li>",
            "<li>", helpers.linkTo(foo, {name: "hello", ext: "world"}), "</li>",
        "</ul></body></html>");
});

// start server if run as main script
if (require.main === module) {
    require("ringo/httpserver").main(module.id);
}

