module.exports = function (RED) {

    function NodeAmcrestAd110Config(config) {
        RED.nodes.createNode(this, config);
        const node = this;

        node.ipAddr = config.ipAddr;
        node.password = node.credentials.password;

        // node.ad110.isAlive()
        //     .then(alive => node.log(`AD110 ${alive ? 'is' : 'is not'} alive.`))
        //     .catch(node.warn);
    }

    RED.nodes.registerType("node-amcrest-ad110-config", NodeAmcrestAd110Config, {
        credentials: {
            password: { type: "password" }
        }
    });
}
