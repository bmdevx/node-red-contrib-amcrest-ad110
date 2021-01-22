module.exports = function (RED) {

    function NodeAmcrestAd110Config(config) {
        RED.nodes.createNode(this, config);
        const node = this;

        node.ipAddr = config.ipAddr;
        node.password = node.credentials.password;
    }

    RED.nodes.registerType("node-amcrest-ad110-config", NodeAmcrestAd110Config, {
        credentials: {
            password: { type: "password" }
        }
    });
}
