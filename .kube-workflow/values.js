const fs = require("fs");
const path = require("path");

const funcsDir = path.join(__dirname, "../functions");

module.exports = (values) => {
  const functionsNames = fs
    .readdirSync(funcsDir)
    .filter((name) => fs.statSync(path.join(funcsDir, name)).isDirectory());

  const apps = {};

  functionsNames.forEach((name) => {
    apps[`app-${name}`] = {
      containerPort: 3000,
      imagePackage: name,
      host: values.global.isProd
        ? `sre-faas-${name}.${values.global.domain}`
        : values.global.isPreProd
        ? `sre-faas-${name}-preprod.${values.global.domain}`
        : `sre-faas-${name}-${values.global.branchSlug}.${values.global.domain}`,
      resources: {
        requests: {
          cpu: 0.05,
          memory: "64Mi"
        },
        limits: {
          cpu: 0.5,
          memory: "256Mi"
        },
      },
    };
  });

  return Object.assign(values, {
    ...apps,
  });
};
