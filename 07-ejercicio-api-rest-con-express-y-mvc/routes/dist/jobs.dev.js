"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jobsRouter = void 0;

var _express = require("express");

var _jobs = require("../controllers/jobs.js");

var jobsRouter = (0, _express.Router)();
exports.jobsRouter = jobsRouter;
jobsRouter.get('/', _jobs.JobController.getAll);
jobsRouter.get('/:id', _jobs.JobController.getId);
jobsRouter.post('/', _jobs.JobController.create);
jobsRouter.put('/:id', _jobs.JobController.update);
jobsRouter.patch('/:id', _jobs.JobController.partialUpdate);
jobsRouter["delete"]('/:id', _jobs.JobController["delete"]);
//# sourceMappingURL=jobs.dev.js.map
