const AmcrestAD110 = require('amcrest-ad110');

module.exports = function (RED) {

    function NodeAmcrestAd110Snapshot(config) {
        RED.nodes.createNode(this, config);
        const node = this;

        const configNode = (typeof config.config === 'string') ? RED.nodes.getNode(config.config) : config.config;

        const ad110 = new AmcrestAD110({
            ipAddr: configNode.ipAddr,
            password: configNode.password
        });

        node.on('input', (msg, send, done) => {
            ad110.takeSnapshot()
                .then(buffer => {
                    var data, iformat = msg.imageFormat || config.imageFormat;

                    switch (iformat) {
                        case 'base64': data = Buffer.from(buffer).toString('base64'); break;
                        case 'buffer':
                        default: data = buffer; iformat = 'buffer'; break;
                    }

                    msg.payload = data;
                    msg.imageFormat = iformat;
                    msg.time = new Date();

                    node.send(msg);
                })
                .catch(node.warn)
                .finally(done);
        });
    }

    RED.nodes.registerType("node-amcrest-ad110-snapshot", NodeAmcrestAd110Snapshot);
}
