#!/usr/bin/env node

import http from "http";

import parseArgs from "minimist";
import httpProxy from "http-proxy";

const argv = parseArgs(process.argv.slice(2), {
  default: {
    port: 5050,
  },
});

const [target] = argv._;
const { port } = argv;

const proxy = httpProxy.createProxyServer({});

proxy.on("proxyRes", function (proxyRes, req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
});

const server = http.createServer(function (req, res) {
  proxy.web(req, res, {
    target,
    secure: false,
  });
});

console.log(`listening on port ${port} -> ${target}`);

server.listen(port);
