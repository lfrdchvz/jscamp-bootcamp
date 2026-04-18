"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JobController = void 0;

var _job = require("../models/job.js");

var _config = require("../config.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var JobController =
/*#__PURE__*/
function () {
  function JobController() {
    _classCallCheck(this, JobController);
  }

  _createClass(JobController, null, [{
    key: "getAll",
    value: function getAll(request, response) {
      var _request$query, text, nivel, technology, _request$query$limit, limit, _request$query$offset, offset, result;

      return regeneratorRuntime.async(function getAll$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _request$query = request.query, text = _request$query.text, nivel = _request$query.nivel, technology = _request$query.technology, _request$query$limit = _request$query.limit, limit = _request$query$limit === void 0 ? _config.DEFAULTS.LIMIT_PAGINATION : _request$query$limit, _request$query$offset = _request$query.offset, offset = _request$query$offset === void 0 ? _config.DEFAULTS.LIMIT_OFFSET : _request$query$offset;
              _context.next = 3;
              return regeneratorRuntime.awrap(_job.JobModel.getAll({
                text: text,
                nivel: nivel,
                technology: technology,
                limit: limit,
                offset: offset
              }));

            case 3:
              result = _context.sent;
              return _context.abrupt("return", response.json({
                data: result,
                total: result.length,
                limit: Number(limit),
                offset: Number(offset)
              }));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "getId",
    value: function getId(request, response) {
      var id, job;
      return regeneratorRuntime.async(function getId$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              id = request.params.id;
              _context2.next = 3;
              return regeneratorRuntime.awrap(_job.JobModel.getById(id));

            case 3:
              job = _context2.sent;

              if (job) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt("return", response.status(404).json({
                message: 'Empleo no encontrado'
              }));

            case 6:
              return _context2.abrupt("return", response.json(job));

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "create",
    value: function create(request, response) {
      var _request$body, titulo, empresa, ubicacion, data, newJob;

      return regeneratorRuntime.async(function create$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _request$body = request.body, titulo = _request$body.titulo, empresa = _request$body.empresa, ubicacion = _request$body.ubicacion, data = _request$body.data;
              _context3.next = 3;
              return regeneratorRuntime.awrap(_job.JobModel.create({
                titulo: titulo,
                empresa: empresa,
                ubicacion: ubicacion,
                data: data
              }));

            case 3:
              newJob = _context3.sent;
              return _context3.abrupt("return", response.status(201).json(newJob));

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }, {
    key: "update",
    value: function update(request, response) {
      var id, updatedJob;
      return regeneratorRuntime.async(function update$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              id = request.params.id;
              _context4.next = 3;
              return regeneratorRuntime.awrap(_job.JobModel.update(id, request.body));

            case 3:
              updatedJob = _context4.sent;

              if (updatedJob) {
                _context4.next = 6;
                break;
              }

              return _context4.abrupt("return", response.status(404).json({
                message: 'Empleo no encontrado'
              }));

            case 6:
              return _context4.abrupt("return", response.json(updatedJob));

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  }, {
    key: "partialUpdate",
    value: function partialUpdate(request, response) {
      var id, updatedJob;
      return regeneratorRuntime.async(function partialUpdate$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              id = request.params.id;
              _context5.next = 3;
              return regeneratorRuntime.awrap(_job.JobModel.partialUpdate(id, request.body));

            case 3:
              updatedJob = _context5.sent;

              if (updatedJob) {
                _context5.next = 6;
                break;
              }

              return _context5.abrupt("return", response.status(404).json({
                message: 'Empleo no encontrado'
              }));

            case 6:
              return _context5.abrupt("return", response.json(updatedJob));

            case 7:
            case "end":
              return _context5.stop();
          }
        }
      });
    }
  }, {
    key: "delete",
    value: function _delete(request, response) {
      var id, deleted;
      return regeneratorRuntime.async(function _delete$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              id = request.params.id;
              _context6.next = 3;
              return regeneratorRuntime.awrap(_job.JobModel["delete"](id));

            case 3:
              deleted = _context6.sent;

              if (deleted) {
                _context6.next = 6;
                break;
              }

              return _context6.abrupt("return", response.status(404).json({
                message: 'Empleo no encontrado'
              }));

            case 6:
              return _context6.abrupt("return", response.status(204).send());

            case 7:
            case "end":
              return _context6.stop();
          }
        }
      });
    }
  }]);

  return JobController;
}();

exports.JobController = JobController;
//# sourceMappingURL=jobs.dev.js.map
