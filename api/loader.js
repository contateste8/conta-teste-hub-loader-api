const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  const { key, hwid } = req.query;

  const keysPath = path.join(__dirname, "..", "keys.json");
  const keys = JSON.parse(fs.readFileSync(keysPath, "utf8")).chaves;

  if (!key || !hwid) {
    return res.status(400).send("Parâmetros ausentes.");
  }

  if (!keys[key]) {
    return res.status(403).send("Chave inválida.");
  }

  if (keys[key] !== hwid) {
    return res.status(403).send("HWID não autorizado.");
  }

  const script = `print("acesso liberado só pra você!")`;
  res.status(200).send(script);
};
