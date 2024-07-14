const { performance } = require("perf_hooks");
const start = performance.now();
const end = performance.now();
const responseTime = `${start - end} ms`;

export default { start, end, responseTime };
