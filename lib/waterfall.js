/*
 * Waterfall Mobile Customization to Swagger UI
 *
 * Our APIs have a version filter that leverages the apiKey parameter.  Whenever
 * checkboxes representing v1 and v2 are clicked, the Swagger UI re-renders
 * with the appropriate apiKey value.
 */
$(function() {

    // Default Swagger UI parameters
    var swaggerInit = {
        discoveryUrl:"http://localhost:8080/api/api-docs",
        apiKeyName:"version",
        apiKey:null,   // by default, don't filter by version
        dom_id:"swagger-ui-container",
        supportHeaderParams: false,
        supportedSubmitMethods: ['get', 'post', 'put'],
        onComplete: function(swaggerApi, swaggerUi){
            if(console) {
                console.log("Loaded SwaggerUI")
                console.log(swaggerApi);
                console.log(swaggerUi);
            }
          $('pre code').each(function(i, e) {hljs.highlightBlock(e)});
        },
        onFailure: function(data) {
            if(console) {
                console.log("Unable to Load SwaggerUI");
                console.log(data);
            }
        },
        docExpansion: "none"
    };

    // DOM elements
    var cbV1El = $('#cbV1');
    var cbV2El = $('#cbV2');
    
    // Checkbox change handler
    var onCheckboxChange = function() {
        var v1 = cbV1El.is(':checked');
        var v2 = cbV2El.is(':checked');
        var version_apiKey = null;

        // if both are checked or none are checked, show everything
        if (v1 === v2) {
            version_apiKey = null;  // don't filter
        } else if (v1) {
            version_apiKey = "1";
        } else {
            version_apiKey = "2";
        }

        swaggerInit.apiKey = version_apiKey;
        window.swaggerUi.updateSwaggerUi(swaggerInit);
    }

    // Register checkbox change event handlers
    cbV1El.change(onCheckboxChange);
    cbV2El.change(onCheckboxChange);
    
});
