const { join } = require('path');
const { chmodSync, copyFileSync, existsSync, unlink } = require('fs');
const { getInstallationPath } = require('../common');

function verifyAndPlaceBinary(binName, binPath, callback) {
  if (!existsSync(join(binPath, binName))) {
    return callback(`Downloaded binary does not contain the binary specified in configuration - ${binName}`);
  }

  getInstallationPath((err, installationPath) => {
      if (err) {
        return callback(err);
      }

      // Move the binary file and make sure it is executable
      copyFileSync(join(binPath, binName), join(installationPath, binName));
      console.log('Installing', join(installationPath, binName))
      console.log('Unlinking', join(binPath, binName))
      unlink(join(binPath, binName));
      chmodSync(join(installationPath, binName), '755');

      console.log('Placed binary on', join(installationPath, binName));

      callback(null);
  });
}

module.exports = verifyAndPlaceBinary;
