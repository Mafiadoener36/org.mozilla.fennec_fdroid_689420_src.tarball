/* vim: set ts=2 et sw=2 tw=80: */
/* Any copyright is dedicated to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/ */
/* import-globals-from helper_events_test_runner.js */
"use strict";

// Test that markup view event bubbles show the correct event info for jQuery
// and jQuery Live events (jQuery version 1.1).

const TEST_LIB = "lib_jquery_1.1.js";
const TEST_URL = URL_ROOT + "doc_markup_events_jquery.html?" + TEST_LIB;

loadHelperScript("helper_events_test_runner.js");

/*eslint-disable */
const TEST_DATA = [
  {
    selector: "html",
    expected: [
      {
        type: "load",
        filename: TEST_URL + ":27",
        attributes: [
          "Bubbling",
          "DOM2"
        ],
        handler: `
          () => {
            var handler1 = function liveDivDblClick() {
              alert(1);
            };
            var handler2 = function liveDivDragStart() {
              alert(2);
            };
            var handler3 = function liveDivDragLeave() {
              alert(3);
            };
            var handler4 = function liveDivDragEnd() {
              alert(4);
            };
            var handler5 = function liveDivDrop() {
              alert(5);
            };
            var handler6 = function liveDivDragOver() {
              alert(6);
            };
            var handler7 = function divClick1() {
              alert(7);
            };
            var handler8 = function divClick2() {
              alert(8);
            };
            var handler9 = function divKeyDown() {
              alert(9);
            };
            var handler10 = function divDragOut() {
              alert(10);
            };

            if ($("#livediv").live) {
              $("#livediv").live("dblclick", handler1);
              $("#livediv").live("dragstart", handler2);
            }

            if ($("#livediv").delegate) {
              $(document).delegate("#livediv", "dragleave", handler3);
              $(document).delegate("#livediv", "dragend", handler4);
            }

            if ($("#livediv").on) {
              $(document).on("drop", "#livediv", handler5);
              $(document).on("dragover", "#livediv", handler6);
              $(document).on("dragout", "#livediv:xxxxx", handler10);
            }

            var div = $("div")[0];
            $(div).click(handler7);
            $(div).click(handler8);
            $(div).keydown(handler9);
          }`
      },
      {
        type: "load",
        filename: URL_ROOT + TEST_LIB + ":1224",
        attributes: [
          "Bubbling",
          "DOM2"
        ],
        handler: `
          function(event) {
            if (typeof jQuery == "undefined") return false;

            // Empty object is for triggered events with no data
            event = jQuery.event.fix(event || window.event || {});

            // returned undefined or false
            var returnValue;

            var c = this.events[event.type];

            var args = [].slice.call(arguments, 1);
            args.unshift(event);

            for (var j in c) {
              // Pass in a reference to the handler function itself
              // So that we can later remove it
              args[0].handler = c[j];
              args[0].data = c[j].data;

              if (c[j].apply(this, args) === false) {
                event.preventDefault();
                event.stopPropagation();
                returnValue = false;
              }
            }

            // Clean up added properties in IE to prevent memory leak
            if (jQuery.browser.msie) event.target = event.preventDefault = event.stopPropagation = event.handler = event.data = null;

            return returnValue;
          }`
      }
    ]
  },
  {
    selector: "#testdiv",
    expected: [
      {
        type: "click",
        filename: TEST_URL + ":34",
        attributes: [
          "jQuery"
        ],
        handler: `
          function divClick1() {
            alert(7);
          }`
      },
      {
        type: "click",
        filename: TEST_URL + ":35",
        attributes: [
          "jQuery"
        ],
        handler: `
          function divClick2() {
            alert(8);
          }`
      },
      {
        type: "click",
        filename: URL_ROOT + TEST_LIB + ":1224",
        attributes: [
          "Bubbling",
          "DOM2"
        ],
        handler: `
          function(event) {
            if (typeof jQuery == "undefined") return false;

            // Empty object is for triggered events with no data
            event = jQuery.event.fix(event || window.event || {});

            // returned undefined or false
            var returnValue;

            var c = this.events[event.type];

            var args = [].slice.call(arguments, 1);
            args.unshift(event);

            for (var j in c) {
              // Pass in a reference to the handler function itself
              // So that we can later remove it
              args[0].handler = c[j];
              args[0].data = c[j].data;

              if (c[j].apply(this, args) === false) {
                event.preventDefault();
                event.stopPropagation();
                returnValue = false;
              }
            }

            // Clean up added properties in IE to prevent memory leak
            if (jQuery.browser.msie) event.target = event.preventDefault = event.stopPropagation = event.handler = event.data = null;

            return returnValue;
          }`
      },
      {
        type: "keydown",
        filename: TEST_URL + ":36",
        attributes: [
          "jQuery"
        ],
        handler: `
          function divKeyDown() {
            alert(9);
          }`
      },
      {
        type: "keydown",
        filename: URL_ROOT + TEST_LIB + ":1224",
        attributes: [
          "Bubbling",
          "DOM2"
        ],
        handler: `
          function(event) {
            if (typeof jQuery == "undefined") return false;

            // Empty object is for triggered events with no data
            event = jQuery.event.fix(event || window.event || {});

            // returned undefined or false
            var returnValue;

            var c = this.events[event.type];

            var args = [].slice.call(arguments, 1);
            args.unshift(event);

            for (var j in c) {
              // Pass in a reference to the handler function itself
              // So that we can later remove it
              args[0].handler = c[j];
              args[0].data = c[j].data;

              if (c[j].apply(this, args) === false) {
                event.preventDefault();
                event.stopPropagation();
                returnValue = false;
              }
            }

            // Clean up added properties in IE to prevent memory leak
            if (jQuery.browser.msie) event.target = event.preventDefault = event.stopPropagation = event.handler = event.data = null;

            return returnValue;
          }`
      }
    ]
  }
];
/* eslint-enable */

add_task(async function() {
  await runEventPopupTests(TEST_URL, TEST_DATA);
});