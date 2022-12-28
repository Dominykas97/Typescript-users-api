"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/');
router.get('/:id');
router.post('/');
router.delete('/:id');
exports.default = router;
