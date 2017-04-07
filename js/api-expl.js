 "use strict";

readConfig(apiObj);

function readConfig(arr) {   // Read the config.js file
  var len = arr.length;
  var array;

  if(len) {
    // for loop reads array of config objects defining each command in the REST API
    for(var i=0;i<len;i++) {
      var comp = createComponent(arr[i]);
      if(comp)
        var ex = document.getElementById('explorer');
        ex.appendChild(comp);
    }
  }
}

function createContainer(id, cName, text) {
  var el = document.createElement("div");
  if(id) el.setAttribute('id', id );
  if(cName) el.setAttribute('class', cName );
  if(text)   el.innerText = text;
  return el;
}

function displayResponseView(result, dataId) {
  var responseView = document.getElementById(dataId + "-resp");

  while(responseView.firstChild){
    responseView.removeChild(responseView.firstChild);
  }
  var titlebar = createContainer(null, 'titlebar', "Response");
  responseView.appendChild(titlebar);
  var rText = createContainer(null, 'content', "");
  rText.innerText = JSON.stringify(result);
  responseView.appendChild(rText);
}

function sendRequest(url, method, dataId, headerStr) { // need to add form to this?
  var headers = headerStr.split('|');
  var headerObj = {};  // create object from headerStr; split to array, obj transform

  for(var i=0;i<headers.length;i++) {
    var headerItem = headers[i];
    var itemArr = headerItem.split(':');
    headerObj[itemArr[0]] = itemArr[1];
  }

  jQuery.ajax({
    method: method,
    url: url,
    data: $('#' + dataId + "-test").serialize(),
    headers: JSON.stringify(headerObj)
  })
    .done((result, sText, rObj) => {
      displayResponseView(result, dataId);
      console.log(result); // send text to response-view
  })
    .fail((jqXHR, textStatus, error) => {
      console.log(textStatus);  // failed message in console
  });
}

function createForm(item) {
  var f = document.createElement("form");
  f.setAttribute('method', item.method);
  f.setAttribute('action', item.url);
  f.setAttribute('id', item.title + item.method + "-test");
  f.setAttribute('name', item.title);
  return f;                   // append all input elements to this form element
}

function setTitleDisplay(comp, item) {
  var titlebar = createContainer(null, 'titlebar', item.title);
  comp.appendChild(titlebar);  // add title to componenet header

  var displayM = createContainer(null, 'displayM', item.method);  // Method display
  comp.appendChild(displayM);

  var displayUrl = createContainer(null, 'url', item.url);  // URL display
  comp.appendChild(displayUrl);

  var headerStr = createHeaderStr('', item.headers);
  var displayHeaders = createContainer('headers', 'url', headerStr);  // Header display
  comp.appendChild(displayHeaders);
}

function createComponent(item) {
  var di = document.createElement("div");  // component container created
  di.setAttribute('id', item.title);
  //di.setAttribute('id', item.title + item.method)
  di.setAttribute('class', 'component');

  setTitleDisplay(di, item);
  var frm = createForm(item);   // return a form, append body fields if any

  if(item.body && item.body.length) {
    var blen = item.body.length;
    for(var j=0;j<blen;j++) {
      createInput(item.body[j], frm);
    }
  }

  addButtons(frm, item);
  addResponsViewer(frm, item.title + item.method + "-resp");
  di.appendChild(frm);  // add the new form to the componenet container
  return di;
}

/* create an input from each item listed in the body[] array */
function createInput(inpObj, frmEl) {
  var br = document.createElement("br");
  var inp = document.createElement("input"); //input element, Submit button
  inp.setAttribute('class', 'input');  // special class to id these fields

  for(var i in inpObj) {
    if (inpObj.hasOwnProperty(i)) {
       inp.setAttribute(i, inpObj[i]);
    }
  }
  frmEl.appendChild(inp);
  frmEl.appendChild(br);
}

function createHeaderStr(headerStr, header) {
  for(var i in header) {
    if (header.hasOwnProperty(i)) {
      if(headerStr === '') {
        headerStr += i + ':' + header[i];
      }
      else {
        headerStr += '|' + i + ':' + header[i];
      }
    }
  }
  return headerStr;
}

/* Add buttons to each API component: Submit, Test, Clear */
function addButtons(el, item) {
  var buttons = document.createElement("div"); // buttons container
  buttons.setAttribute('class',"buttons");

  var sub = document.createElement("input"); //input element, Submit button
  sub.setAttribute('type',"button");
  sub.setAttribute('value',"Send Request");
  sub.setAttribute('class', "button");

  if(item) {   // needs an id item.title + item.method
    var url = item.url;
    var method = item.method;
    var str = '';
    var header = item.headers;
    var headerStr = createHeaderStr(str, header);
    var dataId = item.title + item.method;

    sub.setAttribute('onclick', "return sendRequest('" + url + "','" + method + "','" + dataId + "','" + headerStr + "');");
  }

  var test = null;
  if(item.body && item.body.length) {

    var testid = dataId + "-test";
    test = document.createElement("input"); //input element, Test button
    test.setAttribute('type',"button");
    test.setAttribute('value',"Test Data");
    test.setAttribute('onclick',"fillTestData('" + testid + "')");
    test.setAttribute('class', "button");

    var clear = document.createElement("input"); //input element, Clear button
    clear.setAttribute('type',"reset");
    clear.setAttribute('value',"Clear Form");
    clear.setAttribute('class', "button");
  }

  buttons.appendChild(sub);

  if(item.body && item.body.length) {
    buttons.appendChild(test);
    buttons.appendChild(clear);
  }
  el.appendChild(buttons);
}

function addResponsViewer(el, id) {
  var resp = createContainer(id, 'response-view', ''); // id = item.title + item.method + "-resp"
  el.appendChild(resp);
}

function fillTestData(testid) {
  var frm = document.getElementById(testid);
  var len = frm.length - 3;

  for(var i=0; i<len; i++) {
    var inputs = frm.getElementsByClassName("input");
    var attlen = inputs[i].attributes.length;
    var testdata = '';
    if(attlen) {
        testdata = inputs[i].attributes[attlen - 1].textContent;
    }
    if(testdata !== '') inputs[i].value = testdata;
  }
}
