# REST-Explorer
A Simple REST API Explorer displays a User Interface for all REST commands described by the config file.

- API explorer UI is rendered from a JS config file.
- understands any html5 <input> attributes, for example:
(an object with key-value type: number would render <input type="number")
- each input may have any number of attributes. (ex: pattern, min, max, etc.)

HOW TO INSTALL:

cd to your web server document root (htdocs) folder

git clone https://github.com/surfyogi/REST-Explorer.git

cd rest-explorer

In your web browser, go to: http://localhost/rest-explorer/index.html


Configuration:

1) Use the config.js file as an example of how to set up the explorer for
a given existing REST API. This file is read by the explorer, then each
command of the API is rendered as a component in the explorer main view.

2) For POST/PUT commands it is possible to add example test data in the config.js
(for the Test button which will be included in the component).
Click the Test button and the form fields will be filled out, and then the
Request may be sent (click the Send Request button).

3) Upon a successful response from the server, the RESPONSE area will be
shown with the servers response text included.

4) Multiple headers are supported but not demonstrated in the config file.

5) User may submit their own data by editing the fields in each POST component.

6) User may not edit the API url or headers in the UI of each component.


This tool is written in Pure JS, with the exception of Jquery is used for ajax
and form submission only.
