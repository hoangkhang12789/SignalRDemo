class SignalRService {
    constructor(host, hubName) {
        this.url = new URL(hubName, host);
        this.connection = "";
        this.id = "";
        this.build();
    }
    build() {
        this.connection = new signalR.HubConnectionBuilder().withUrl(this.url.href).build();
    }
    async start() {
        try {
            await this.connection.start();
            this.id = this.connection.connectionId;
            console.log(this.id)
            console.log("SignalR connected successfully.");
        } catch (err) {
            console.log(err);
            setTimeout(start, 5000);
        }
    }
    async startWithGroup(funcHub, groupName) {
        var _this = this;
        var connection = _this.connection;
        connection.start().then(function () {
            connection.invoke(funcHub, groupName).then(function () { 
                _this.id = connection.connectionId
                console.log("SignalR connect and join group success.");
            })
            
        }).catch(function (err) {
            return console.error(err.toString());
            setTimeout(startWithGroup, 5000);
        }); 
    }
    async stop() {
        this.connection.stop();
    }
    async on(funcHub,myFunc) {
        this.connection.on(funcHub, function (obj) {
            myFunc(obj);
        });
    }
    async send(funcHub,obj) {
        try {
            await this.connection.invoke(funcHub, obj)
        } catch (err) {
            console.error(err);
        }
    }
    async sendToGroup(funcHub,groupName, obj) {
        try {
            await this.connection.invoke(funcHub, groupName, obj)
        } catch (err) {
            console.error(err);
        }
    }
}