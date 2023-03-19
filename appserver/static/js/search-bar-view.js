require(["jquery",
    "splunkjs/ready!",
], function ($, Ready) {
    console.log("search-bar-view.js is loading")
    var deps = [
        "splunkjs/ready!",
        "splunkjs/mvc/searchmanager",
        "splunkjs/mvc/searchbarview",
        "splunkjs/mvc/searchcontrolsview",
        "splunkjs/mvc/tableview"
    ];
    require(deps, function (mvc) {
        // Load individual components
        var SearchManager = require("splunkjs/mvc/searchmanager");
        var SearchbarView = require("splunkjs/mvc/searchbarview");
        var SearchControlsView = require("splunkjs/mvc/searchcontrolsview");
        var TableView = require("splunkjs/mvc/tableview");
        var mvc = require("splunkjs/mvc");
        var defaultTokens = mvc.Components.get("default")
        var previousSplunkQuery_1 = ""
        var previousSplunkQuery_2 = ""

        defaultTokens.on("change:splunk_query_command", function (model, value, options) {
            
            $("#mysearchbar1").remove()
            $("#mysearchbar2").remove()
            $("#mysearchcontrols1").remove()
            $("#mysearchcontrols2").remove()
            $("#mytable1").remove()
            $("#mytable2").remove()
            document.getElementById("search_bar_box_1").innerHTML += '<div id="mysearchbar1">'
            document.getElementById("search_bar_box_1").innerHTML += '<div id="mysearchcontrols1">'
            document.getElementById("search_bar_box_1").innerHTML += '<div id="mytable1">'
            document.getElementById("search_bar_box_2").innerHTML += '<div id="mysearchbar2">'
            document.getElementById("search_bar_box_2").innerHTML += '<div id="mysearchcontrols2">'
            document.getElementById("search_bar_box_2").innerHTML += '<div id="mytable2">'

            let splunk_query_1 = defaultTokens.get("splunk_query_1")
            let splunk_query_2 = defaultTokens.get("splunk_query_2")
            let ID1 = Math.random()
            let ID2 = Math.random()
            let SearchID_1 = "search_" + ID1
            let SearchID_2 = "search_" + ID2
            let SearchBarID_1 = "mysearchbar_" + ID1
            let SearchBarID_2 = "mysearchbar_" + ID2
            let SearchControlsID_1 = "mysearchControls_" + ID1
            let SearchControlsID_2 = "mysearchControls_" + ID2
            let TableID_1 = "mytable_" + ID1
            let TableID_2 = "mytable_" + ID2

            console.log("splunk_query_1 ", splunk_query_1, " splunk_query_2 ", splunk_query_2)
            console.log("previousSplunkQuery_1 ", previousSplunkQuery_1, " previousSplunkQuery_2 ", previousSplunkQuery_2)


            // Create the search manager and views
            var mysearch1 = new SearchManager({
                id: SearchID_1,
                // search: previousSplunkQuery_1="" || previousSplunkQuery_1 == splunk_query_1 ? splunk_query_1 : mvc.tokenSafe("$searchquery1$"),
                search: splunk_query_1,
                earliest_time: mvc.tokenSafe("$earlyval1$"),
                latest_time: mvc.tokenSafe("$lateval1$"),
                app: "search",
                preview: true,
                required_field_list: "*",
                status_buckets: 300
            });

            var mysearchbar1 = new SearchbarView({
                id: SearchBarID_1,
                managerid: SearchID_1,
                value: splunk_query_1,
                timerange_earliest_time: mvc.tokenSafe("$earlyval1$"),
                timerange_latest_time: mvc.tokenSafe("$lateval1$"),
                default: splunk_query_1,
                el: $("#mysearchbar1")
            }).render();

            // Listen for changes to the search query portion of the searchbar
            mysearchbar1.on("change", function () {
                // Reset the search query (allows the search to run again,
                // even when the query is unchanged)
                mysearch1.settings.unset("search");

                // Update the search query
                mysearch1.settings.set("search", mysearchbar1.val());

                // Run the search (because autostart=false)
                mysearch1.startSearch();
            });


            var mysearchcontrols1 = new SearchControlsView({
                id: SearchControlsID_1,
                managerid: SearchID_1,
                el: $("#mysearchcontrols1")
            }).render();

            var mytable1 = new TableView({
                id: TableID_1,
                managerid: SearchID_1,
                el: $("#mytable1")
            }).render();



            var mysearch2 = new SearchManager({
                id: SearchID_2,
                // search: previousSplunkQuery_2="" || previousSplunkQuery_2 == mvc.tokenSafe("$searchquery2$") ? splunk_query_2 : mvc.tokenSafe("$searchquery2$"),
                search: splunk_query_2,
                earliest_time: mvc.tokenSafe("$earlyval2$"),
                latest_time: mvc.tokenSafe("$lateval2$"),
                app: "search",
                preview: true,
                required_field_list: "*",
                status_buckets: 300
            });

            var mysearchbar2 = new SearchbarView({
                id: SearchBarID_2,
                managerid: SearchID_2,
                value: splunk_query_2,
                timerange_earliest_time: mvc.tokenSafe("$earlyval2$"),
                timerange_latest_time: mvc.tokenSafe("$lateval2$"),
                default: splunk_query_2,
                el: $("#mysearchbar2")
            }).render();

            mysearchbar2.on("change", function () {
                // Reset the search query (allows the search to run again,
                // even when the query is unchanged)
                mysearch2.settings.unset("search");

                // Update the search query
                mysearch2.settings.set("search", mysearchbar2.val());

                // Run the search (because autostart=false)
                mysearch2.startSearch();
            });

            var mysearchcontrols2 = new SearchControlsView({
                id: SearchControlsID_2,
                managerid: SearchID_2,
                el: $("#mysearchcontrols2")
            }).render();

            var mytable2 = new TableView({
                id: TableID_2,
                managerid: SearchID_2,
                el: $("#mytable2")
            }).render();

            previousSplunkQuery_1 = splunk_query_1
            previousSplunkQuery_2 = splunk_query_2

            console.log("previousSplunkQuery_1 ", previousSplunkQuery_1, " previousSplunkQuery_2 ", previousSplunkQuery_2)

        });

    });

})