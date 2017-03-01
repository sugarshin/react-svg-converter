'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('babel-polyfill');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _svgo = require('svgo');

var _svgo2 = _interopRequireDefault(_svgo);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _svg2js = require('svgo/lib/svgo/svg2js');

var _svg2js2 = _interopRequireDefault(_svg2js);

var _js2svg = require('./js2svg');

var _js2svg2 = _interopRequireDefault(_js2svg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var svgo = new _svgo2.default();
var fs = _bluebird2.default.promisifyAll(require('fs'));
var glob = _bluebird2.default.promisify(require('glob'));

exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(input, output, template, component) {
    var camelCaps, matches, files, svg, jsx, jsSVG, programs, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _ref8, name, content, fileName;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            camelCaps = function camelCaps(str) {
              return str.split('-').map(function (s) {
                return s.substring(0, 1).toUpperCase() + s.substring(1, s.length);
              }).join('');
            };

            _context2.prev = 1;
            _context2.next = 4;
            return glob(input);

          case 4:
            matches = _context2.sent;
            _context2.next = 7;
            return _bluebird2.default.all(matches.map(function () {
              var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(match) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.t0 = camelCaps(_path2.default.basename(match));
                        _context.next = 3;
                        return fs.readFileAsync(match, 'utf-8');

                      case 3:
                        _context.t1 = _context.sent;
                        return _context.abrupt('return', {
                          name: _context.t0,
                          content: _context.t1
                        });

                      case 5:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x5) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 7:
            files = _context2.sent;
            _context2.next = 10;
            return _bluebird2.default.all(files.map(function (_ref3) {
              var name = _ref3.name,
                  content = _ref3.content;
              return new _bluebird2.default(function (resolve, reject) {
                svgo.optimize(content, function (result) {
                  return resolve({ name: name, content: result.data });
                });
              });
            }));

          case 10:
            svg = _context2.sent;
            _context2.next = 13;
            return _bluebird2.default.all(svg.map(function (_ref4) {
              var name = _ref4.name,
                  content = _ref4.content;
              return new _bluebird2.default(function (resolve, reject) {
                (0, _svg2js2.default)(content, function (result) {
                  return resolve({
                    name: name,
                    content: addStyleJSXAttribute(result, component)
                  });
                });
              });
            }));

          case 13:
            jsx = _context2.sent;
            jsSVG = jsx.map(function (_ref5) {
              var name = _ref5.name,
                  content = _ref5.content;
              return { name: name, content: (0, _js2svg2.default)(content).data };
            });
            programs = jsSVG.map(function (_ref6) {
              var name = _ref6.name,
                  content = _ref6.content;
              return {
                name: name,
                content: template(name.split('.')[0], content)
              };
            });
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 19;
            _iterator = programs[Symbol.iterator]();

          case 21:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context2.next = 30;
              break;
            }

            _ref8 = _step.value;
            name = _ref8.name, content = _ref8.content;
            fileName = name.split('.')[0] + '.js';
            _context2.next = 27;
            return fs.writeFileAsync(_path2.default.resolve(output, fileName), content);

          case 27:
            _iteratorNormalCompletion = true;
            _context2.next = 21;
            break;

          case 30:
            _context2.next = 36;
            break;

          case 32:
            _context2.prev = 32;
            _context2.t0 = _context2['catch'](19);
            _didIteratorError = true;
            _iteratorError = _context2.t0;

          case 36:
            _context2.prev = 36;
            _context2.prev = 37;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 39:
            _context2.prev = 39;

            if (!_didIteratorError) {
              _context2.next = 42;
              break;
            }

            throw _iteratorError;

          case 42:
            return _context2.finish(39);

          case 43:
            return _context2.finish(36);

          case 44:
            _context2.next = 49;
            break;

          case 46:
            _context2.prev = 46;
            _context2.t1 = _context2['catch'](1);

            console.error(_context2.t1);

          case 49:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[1, 46], [19, 32, 36, 44], [37,, 39, 43]]);
  }));

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

function addStyleJSXAttribute(svg, component) {
  var styledSVG = _extends({}, svg);
  var propValue = component ? 'this.props' : 'props';

  styledSVG.content[0].attrs = _extends({}, svg.content[0].attrs, {
    style: {
      name: propValue,
      value: '',
      prefix: '',
      local: '',
      type: 'JSX'
    }
  });

  delete styledSVG.content[0].content[1].attrs.fill;

  return styledSVG;
}