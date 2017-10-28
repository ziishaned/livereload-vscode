import config from './config';
import Server from './Server';
import { resolve } from 'path';
import { StatusBarUi } from './StatusBarUi'
import { window, workspace, StatusBarItem, StatusBarAlignment } from 'vscode';

export default class LiveReload {
    private server;
    private config;
    private isServerRunning: boolean;

    constructor() {
        this.config = config();
        this.isServerRunning = false;

        this.createServer = this.createServer.bind(this);
    }

    public createServer() {
        if (this.isServerRunning) {
            this.server.stop();
            this.isServerRunning = false;
            return;
        } else {
            this.server = new Server(this.config);
            let path = this.getCurrentWorkSpace();
            this.server.watch(path);
            this.isServerRunning = true;
        }

        this.server.on('start', () => {
            StatusBarUi.listening();
        });

        this.server.on('stop', () => {
            StatusBarUi.stopListening();
        });

        this.server.on('refresh', () => {
            StatusBarUi.refresh();
        });

        this.server.on('connected', () => {
            StatusBarUi.connected();
        });

        this.server.on('disconnected', () => {
            StatusBarUi.disconnected();
        });

        this.server.start();
    }

    getCurrentWorkSpace() {
        let path = workspace.rootPath.split(/\s*,\s*/).map(function (x) {
            return resolve(x);
        });

        return path;
    }

    public dispose() {

    }
}