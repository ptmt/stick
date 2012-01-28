var stick = require("stick");
var Application = stick.Application, helpers = stick.helpers;
var response = require("stick/lib/utils/response");

function resolve(n) {
	return module.resolve ? module.resolve(n) : require.resolve(n.charAt(0) != '.' ? './' + n : n)
}

var app = exports.app = Application(),
    foo = resolve("foo"),
    home = resolve("app");

app.configure("route");

// Define an index route that takes optional name and ext arguments.
// Link to the other module's index action with the same name and ext.
app.get("/:name?.:ext?", function(req, name, ext) {
    return response.html(
        "<html><body><h1>Bar</h1>",
        "<p>This is module <b>'bar'</b> called with <b>", name, "</b>, <b>", ext, "</b>. ",
        "Go to ", helpers.linkTo(foo, {name: name, ext: ext}),
        " or back ", helpers.linkTo(home, {}, "home"), ".</p></body></html>"
    );
});
