const fs = require("fs");
const path = require("path");

const funcsDir = path.join(__dirname, "../functions");

module.exports = (values) => {
  const functionsNames = fs
    .readdirSync(funcsDir)
    .filter((name) => fs.statSync(path.join(funcsDir, name)).isDirectory());

  const apps = {
    global: {
      ...values.global,
      namespace: null,
    },
  };
  functionsNames.forEach((name) => {
    apps[`app-${name}`] = {
      namespace: `${values.global.namespace}-${name}`,
      containerPort: 3000,
      imagePackage: name,
    };
  });

  return Object.assign(values, {
    ...apps,
  });
};
