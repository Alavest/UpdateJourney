define([  'postmonger'], function (  Postmonger) {  'use strict';  var connection = new Postmonger.Session();  var authTokens = {};  var payload = {};  var lastStepEnabled = false;  var steps = [{    "label": "Configure Postcard",    "key": "step1"  }];  var currentStep = steps[0].key;  $(window).ready(onRender);  connection.on('initActivity', initialize);  connection.on('requestedTokens', onGetTokens);  connection.on('requestedEndpoints', onGetEndpoints);  connection.on('clickedNext', save);  connection.on('requestedInteractionDefaults', requestedInteractionDefaults);  function requestedInteractionDefaults(settings) {    if (settings.error) {      console.error(settings.error);    } else {      var defaults = settings;    }    console.log('defaults', defaults);    var eventKey = retrieveKey(defaults.email[0]);    $('#EventKeyInput').val(eventKey);    console.log('EventKey', eventKey);  }  function retrieveKey(string) {    var pos1 = string.indexOf(".");    var pos2 = string.indexOf(".", (pos1 + 1));    var result = string.substring((pos1 + 1), pos2);    return result;  }  function onRender() {    // JB will respond the first time 'ready' is called with 'initActivity'    connection.trigger('ready');    connection.trigger('requestTokens');    connection.trigger('requestEndpoints');    connection.trigger('requestInteractionDefaults');  }  function initialize(data) {    console.log(data);    if (data) {      payload = data;    }    var hasInArguments = Boolean(      payload['arguments'] &&      payload['arguments'].execute &&      payload['arguments'].execute.inArguments &&      payload['arguments'].execute.inArguments.length > 0    );    var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};    console.log(inArguments);    $.each(inArguments, function (index, inArgument) {      $.each(inArgument, function (key, val) {        if (key === 'DEExternalKeyInput') {          $('#DEExternalKeyInput').val(val);        }        if (key === 'Key1Input') {          $('#Key1Input').val(val);        }        if (key === 'Key2Input') {          $('#Key2Input').val(val);        }        if (key === 'Key3Input') {          $('#Key3Input').val(val);        }        if (key === 'Key4Input') {          $('#Key4Input').val(val);        }                if (key === 'Field1Input') {          $('#Field1Input').val(val);        }        if (key === 'Field2Input') {          $('#Field2Input').val(val);        }        if (key === 'Field3Input') {          $('#Field3Input').val(val);        }        if (key === 'Field4Input') {          $('#Field4Input').val(val);        }                if (key === 'Value1Input') {          $('#Value1Input').val(val);        }        if (key === 'Value2Input') {          $('#Value2Input').val(val);        }        if (key === 'Value3Input') {          $('#Value3Input').val(val);        }        if (key === 'Value4Input') {          $('#Value4Input').val(val);        }      });    });    connection.trigger('updateButton', {      button: 'next',      text: 'done',      visible: true    });  }  function onGetTokens(tokens) {    // Response: tokens = { token: <legacy token>, fuel2token: <fuel api token> }    console.log(tokens);    authTokens = tokens;  }  function onGetEndpoints(endpoints) {    // Response: endpoints = { restHost: <url> } i.e. "rest.s1.qa1.exacttarget.com"    console.log(endpoints);  }  function save() {	      var EventKeyInput = $('#EventKeyInput').val();    var DEExternalKeyInput = $('#DEExternalKeyInput').val();        var Key1Input = $('#Key1Input').val();    var Key2Input = $('#Key2Input').val();    var Key3Input = $('#Key3Input').val();    var Key4Input = $('#Key4Input').val();        var Key1Value = '{{Event.' + EventKeyInput + '.' + Key1Input + '}}';    var Key2Value = '{{Event.' + EventKeyInput + '.' + Key2Input + '}}';    var Key3Value = '{{Event.' + EventKeyInput + '.' + Key3Input + '}}';    var Key4Value = '{{Event.' + EventKeyInput + '.' + Key4Input + '}}';        var Field1Input = $('#Field1Input').val();    var Field2Input = $('#Field2Input').val();    var Field3Input = $('#Field3Input').val();    var Field4Input = $('#Field4Input').val();        var Value1Input = $('#Value1Input').val();    var Value2Input = $('#Value2Input').val();    var Value3Input = $('#Value3Input').val();    var Value4Input = $('#Value4Input').val();    var KKeys = [];    var VKeys = [];    var KValues = [];    var VValues = [];    if (Key1Input) {      KKeys.push(Key1Input);      VKeys.push(Key1Value);    }    if (Key2Input) {      KKeys.push(Key2Input);      VKeys.push(Key2Value);    }    if (Key3Input) {      KKeys.push(Key3Input);      VKeys.push(Key3Value);    }    if (Key4Input) {      KKeys.push(Key4Input);      VKeys.push(Key4Value);    }    if (Field1Input) {      KValues.push(Field1Input);      VValues.push(Value1Input);    }    if (Field2Input) {      KValues.push(Field2Input);      VValues.push(Value2Input);    }    if (Field3Input) {      KValues.push(Field3Input);      VValues.push(Value3Input);    }    if (Field4Input) {      KValues.push(Field4Input);      VValues.push(Value4Input);    }    var myJson = {      keys: {},      values: {}    };    for (var i = 0; i < KKeys.length; i++) {      var objName = KKeys[i];      var objValue = VKeys[i];      myJson.keys[objName] = objValue;    }    for (var k = 0; k < KValues.length; k++) {      var objName = KValues[k];      var objValue = VValues[k];      myJson.values[objName] = objValue;    }    //myJson = JSON.stringify(myJson)    console.log('Json',myJson);    payload['arguments'].execute.inArguments = [{      "tokens": authTokens,            "DEExternalKeyInput": DEExternalKeyInput,            "Key1Input": Key1Input,      "Key2Input": Key2Input,      "Key3Input": Key3Input,      "Key4Input": Key4Input,            "Field1Input": Field1Input,      "Field2Input": Field2Input,      "Field3Input": Field3Input,      "Field4Input": Field4Input,            "Value1Input": Value1Input,      "Value2Input": Value2Input,      "Value3Input": Value3Input,      "Value4Input": Value4Input,            "Key1Value": '{{Event.' + EventKeyInput + '.' + Key1Input + '}}',      "Key2Value": '{{Event.' + EventKeyInput + '.' + Key2Input + '}}',      "Key3Value": '{{Event.' + EventKeyInput + '.' + Key3Input + '}}',      "Key4Value": '{{Event.' + EventKeyInput + '.' + Key4Input + '}}',            "Json": myJson    }];    payload['metaData'].isConfigured = true;    console.log(payload);    connection.trigger('updateActivity', payload);  }});