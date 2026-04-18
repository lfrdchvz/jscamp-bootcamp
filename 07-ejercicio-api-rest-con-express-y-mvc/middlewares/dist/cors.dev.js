"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.corsMiddleware = void 0;

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ACCEPTED_ORIGINS = ['http://localhost:5173', 'https://midu.dev', 'http://localhost:3000', 'https://07-ejercicio-api-rest-con-express-y.vercel.app', null];

var corsMiddleware = function corsMiddleware() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$acceptedOrigins = _ref.acceptedOrigins,
      acceptedOrigins = _ref$acceptedOrigins === void 0 ? ACCEPTED_ORIGINS : _ref$acceptedOrigins;

  return (0, _cors["default"])({
    origin: function origin(_origin, callback) {
      // Si no hay origin (petición directa desde navegador o curl) se permite
      if (!_origin || acceptedOrigins.includes(_origin)) {
        return callback(null, true);
      }

      return callback(new Error('Origen no permitido'));
    }
  });
};

exports.corsMiddleware = corsMiddleware;
//# sourceMappingURL=cors.dev.js.map
