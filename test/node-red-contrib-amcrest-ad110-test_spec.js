const should = require("should");
const helper = require("node-red-node-test-helper");
const ad110Monitor = require("../nodes/monitor-node");
const ad110Config = require("../nodes/config-node");
const ad110Snapshot = require("../nodes/snapshot-node");
const KEYS = require('./keys');

helper.init(require.resolve('node-red'));

describe('AD110', function () {

    beforeEach(function (done) {
        helper.startServer(done);
    });

    afterEach(function (done) {
        helper.unload();
        helper.stopServer(done);
    });

    it('should be loaded', function (done) {
        var flow = [
            { id: "ncfg", type: "node-amcrest-ad110-config", name: "config-node", ipAddr: KEYS.IP_ADDRESS },
            { id: "nmonitor", type: "node-amcrest-ad110-monitor", name: "monitor-node", config: "ncfg" },
            { id: "nsnap", type: "node-amcrest-ad110-snapshot", name: "snapshot-node", config: "ncfg" }
        ];

        helper.load([ad110Config, ad110Monitor, ad110Snapshot], flow, {
            ncfg: {
                password: KEYS.PASSWORD
            }
        }, () => {
            var n1 = helper.getNode("ncfg");
            n1.should.have.property('name', 'config-node');

            var n2 = helper.getNode("nmonitor");
            n2.should.have.property('name', 'monitor-node');

            var n3 = helper.getNode("nsnap");
            n3.should.have.property('name', 'snapshot-node');

            done();
        });
    });

    it('test monitor', function (done) {
        var flow = [
            { id: "ncfg", type: "node-amcrest-ad110-config", name: "config-node", ipAddr: KEYS.IP_ADDRESS },
            { id: "nhelp", type: "helper" },
            { id: "nhelpsave", type: "helper" },
            { id: "nmonitor", type: "node-amcrest-ad110-monitor", name: "monitor-node", config: "ncfg", wires: [["nhelp"]] },
            { id: "nsnap", type: "node-amcrest-ad110-snapshot", name: "snapshot-node", config: "ncfg", imageFormat: 'base64', wires: [["nhelpsave"]] }
        ];

        const fdone = done;

        helper.load([ad110Monitor, ad110Snapshot, ad110Config], flow, {
            ncfg: {
                password: KEYS.PASSWORD
            }
        }, function () {
            var nmonitor = helper.getNode("nmonitor");
            var nsnap = helper.getNode("nsnap");
            var nHelp = helper.getNode("nhelp");
            var nHelpSave = helper.getNode("nhelpsave");

            nHelp.on('input', (msg, send, done) => {
                console.log(JSON.stringify(msg));
                done();
            });

            nHelpSave.on('input', (msg, send, done) => {
                require('fs').writeFileSync('test.txt', msg.payload, 'utf-8');
            });

            setTimeout(() => {
                nsnap.receive({
                    payload: true
                })
            }, 4000);



            setTimeout(() => {
                fdone();
            }, 30000);
        });
    }).timeout(60000);
});