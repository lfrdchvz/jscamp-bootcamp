"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aiRouter = void 0;

require("dotenv/config");

var _express = require("express");

var _ai = require("ai");

var _groq = require("@ai-sdk/groq");

var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));

var _job = require("../models/job.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var groq = (0, _groq.createGroq)({
  apiKey: process.env.GROQ_API_KEY
});
var aiRateLimiter = (0, _expressRateLimit["default"])({
  windowMs: 60 * 1000,
  limit: 5,
  message: {
    error: 'Demasiadas solicitudes, por favor intenta de nuevo mas tarde'
  },
  legacyHeaders: false,
  standardHeaders: 'draft-8'
});
var aiRouter = (0, _express.Router)();
exports.aiRouter = aiRouter;
aiRouter.use(aiRateLimiter);
aiRouter.get('/summary/:id', function _callee(request, response) {
  var id, job, prompt, result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          id = request.params.id;
          _context.next = 3;
          return regeneratorRuntime.awrap(_job.JobModel.getById(id));

        case 3:
          job = _context.sent;

          if (job) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", response.status(404).json({
            error: 'Trabajo no encontrado'
          }));

        case 6:
          prompt = ["Eres un asistente que resume ofertas de trabajo para ayudar a los usuarios a entender rapidamente de que trata la oferta. Evita cualquier otra peticion, observacion o comentario. Solo responde con el resumen de la oferta de trabajo. Responde siempre con el markdown directamente", "Resume en 4-6 frases la siguiente oferta de trabajo:", "Incluye: rol, empresa, ubicacion y requisitos clave", "Usa un tono claro y directo en espa\xF1ol", "Titulo: ".concat(job.titulo), "Empresa: ".concat(job.empresa), "Ubicacion: ".concat(job.ubicacion), "Descripcion: ".concat(job.descripcion)].join('\n');
          _context.prev = 7;
          result = (0, _ai.streamText)({
            prompt: prompt,
            model: groq('llama-3.1-8b-instant')
          });
          return _context.abrupt("return", result.pipeTextStreamToResponse(response));

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](7);

          if (response.headersSent) {
            _context.next = 17;
            break;
          }

          response.setHeader('Content-Type', 'application/json');
          return _context.abrupt("return", response.status(500).json({
            error: 'Error generating summary'
          }));

        case 17:
          return _context.abrupt("return", response.end());

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[7, 12]]);
});
//# sourceMappingURL=ai.dev.js.map
