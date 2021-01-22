const AmcrestAD110 = require('amcrest-ad110');

module.exports = function (RED) {

    function NodeAmcrestAd110Monitor(config) {
        RED.nodes.createNode(this, config);
        const node = this;

        const configNode = (typeof config.config === 'string') ? RED.nodes.getNode(config.config) : config.config;

        const ad110 = new AmcrestAD110({
            ipAddr: configNode.ipAddr,
            password: configNode.password,
            rawCodes: config.rawCodes,
            debug: config.debug
        });

        ad110.isAlive()
            .then(alive => {
                if (alive) {
                    node.on('close', done => {
                        ad110.unlisten();
                        ad110.stop();
                        done();
                    });

                    ad110.listen(event => {
                        var payload = {
                            time: new Date()
                        };
                        Object.assign(payload, event);

                        node.send({ payload: payload });
                    });

                    ad110.start();
                } else {
                    node.warn('AD110 Not Found');
                }
            });
    }

    RED.nodes.registerType("node-amcrest-ad110-monitor", NodeAmcrestAd110Monitor);
}
