import { JSDOM } from 'jsdom';
const { window } = new JSDOM('<!DOCTYPE html><html><head></head><body><div class="root"></div></body></html>', {
    url: "https://example.org/",
    referrer: "https://example.com/",
    contentType: "text/html",
    includeNodeLocations: true,
    storageQuota: 10000000
});

// Save these two objects in the global space so that libraries/tests
// can hook into them, using the above doc definition.
global.document = window.document;
global.window = window;

global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;