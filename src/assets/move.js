const { join } = require('path');
const { createWriteStream } = require('fs');

/**
 * Move strategy for binary resources without compression.
 */
function move({ opts, req, onSuccess, onError }) {

  console.log('Start move function')
  const stream = createWriteStream(join(opts.binPath, opts.binName));
  console.log('End move function')

  stream.on('error', onError);
  stream.on('close', onSuccess);

  req.pipe(stream);
}

module.exports = move;
