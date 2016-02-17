import { jsdom } from 'jsdom';

global.document = jsdom('<!doctype html><html><body></body></html>', { url: 'http://localhost'});
global.window = document.defaultView;
global.navigator = global.window.navigator;
