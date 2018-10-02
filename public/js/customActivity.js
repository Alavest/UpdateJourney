define([  'postmonger'], function (  Postmonger) {  'use strict';  var connection = new Postmonger.Session();  var authTokens = {};  var payload = {};  var lastStepEnabled = false;  var steps = [{    "label": "Configure Postcard",    "key": "step1"  }];  var currentStep = steps[0].key;  $(window).ready(onRender);  connection.on('initActivity', initialize);  connection.on('requestedTokens', onGetTokens);  connection.on('requestedEndpoints', onGetEndpoints);  connection.on('clickedNext', save);  connection.on('requestedInteractionDefaults', requestedInteractionDefaults);  function requestedInteractionDefaults(settings) {    if (settings.error) {      console.error(settings.error);    } else {      var defaults = settings;    }    console.log('defaults', defaults);    var eventKey = retrieveKey(defaults.email[0]);    $('#EventKeyInput').val(eventKey);    console.log('EventKey', eventKey);  }  function retrieveKey(string) {    var pos1 = string.indexOf(".");    var pos2 = string.indexOf(".", (pos1 + 1));    var result = string.substring((pos1 + 1), pos2);    return result;  }  function onRender() {    // JB will respond the first time 'ready' is called with 'initActivity'    connection.trigger('ready');    connection.trigger('requestTokens');    connection.trigger('requestEndpoints');    connection.trigger('requestInteractionDefaults');  }  function initialize(data) {    console.log(data);    if (data) {      payload = data;    }    var hasInArguments = Boolean(      payload['arguments'] &&      payload['arguments'].execute &&      payload['arguments'].execute.inArguments &&      payload['arguments'].execute.inArguments.length > 0    );    var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};    console.log(inArguments);    $.each(inArguments, function (index, inArgument) {      $.each(inArgument, function (key, val) {        if (key === 'DEExternalKeyInput') {	        $('#DEExternalKeyInput').val(val);        }        if (key === 'Key1Input') {	        $('#Key1Input').val(val);        }        if (key === 'Key2Input') {	        $('#Key2Input').val(val);        }        if (key === 'Key3Input') {	        $('#Key3Input').val(val);        }        if (key === 'Key4Input') {	        $('#Key4Input').val(val);        }        if (key === 'Field1Input') {	        $('#Field1Input').val(val);        }        if (key === 'Field2Input') {	        $('#Field2Input').val(val);        }        if (key === 'Field3Input') {	        $('#Field3Input').val(val);        }        if (key === 'Field4Input') {	        $('#Field4Input').val(val);        }        if (key === 'Value1Input') {	        $('#Value1Input').val(val);        }        if (key === 'Value2Input') {	        $('#Value2Input').val(val);        }        if (key === 'Value3Input') {	        $('#Value3Input').val(val);        }        if (key === 'Value4Input') {	        $('#Value4Input').val(val);        }              });    });    connection.trigger('updateButton', {      button: 'next',      text: 'done',      visible: true    });  }  function onGetTokens(tokens) {    // Response: tokens = { token: <legacy token>, fuel2token: <fuel api token> }    console.log(tokens);    authTokens = tokens;  }  function onGetEndpoints(endpoints) {    // Response: endpoints = { restHost: <url> } i.e. "rest.s1.qa1.exacttarget.com"    console.log(endpoints);  }  function save() {    var EventKeyInput = $('#EventKeyInput').val();    var DEExternalKeyInput = $('#DEExternalKeyInput').val();    var Key1Input = $('#Key1Input').val();    var Key2Input = $('#Key2Input').val();    var Key3Input = $('#Key3Input').val();    var Key4Input = $('#Key4Input').val();    var Field1Input = $('#Field1Input').val();    var Field2Input = $('#Field1Input').val();    var Field3Input = $('#Field2Input').val();    var Field4Input = $('#Field3Input').val();    var Value1Input = $('#Value4Input').val();    var Value2Input = $('#Value2Input').val();    var Value3Input = $('#Value3Input').val();    var Value4Input = $('#Value4Input').val();        payload['arguments'].execute.inArguments = [{      "tokens": authTokens,      "FirstName": '{{Event.' + EventKeyInput + '.Name}}',      "DEExternalKeyInput" : DEExternalKeyInput,      "Key1Input" : Key1Input,      "Key2Input" : Key2Input,      "Key3Input" : Key3Input,      "Key4Input" : Key4Input,      "Field1Input" : Field1Input,      "Field2Input" : Field2Input,      "Field3Input" : Field3Input,      "Field4Input" : Field4Input,      "Value1Input" : Value1Input,      "Value2Input" : Value2Input,      "Value3Input" : Value3Input,      "Value4Input" : Value4Input    }];    payload['metaData'].isConfigured = true;    console.log(payload);    connection.trigger('updateActivity', payload);  }});