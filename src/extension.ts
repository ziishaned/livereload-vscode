'use strict';

import LiveReload from './LiveReload';
import { ExtensionContext, commands, window } from 'vscode';

export function activate(context: ExtensionContext) {
    const livereload = new LiveReload();

    context.subscriptions.push(commands
        .registerCommand('extension.livereload', () => {
            livereload.createServer();
        })
    );

    context.subscriptions.push(livereload);
}

export function deactivate() { }