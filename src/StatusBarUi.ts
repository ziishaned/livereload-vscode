import { StatusBarItem, window, StatusBarAlignment } from 'vscode';

export class StatusBarUi {
	private static _statusBarItem: StatusBarItem;

	private static get statusbar() {
		if (!StatusBarUi._statusBarItem) {
			StatusBarUi._statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
			StatusBarUi._statusBarItem.command = null;
			this.statusbar.show();
		}

		return StatusBarUi._statusBarItem;
	}

	public static listening() {
		StatusBarUi.statusbar.text = 'The LiveReload plugin has been enabled.';
		StatusBarUi.clear();
	}

	public static stopListening() {
		StatusBarUi.statusbar.text = 'The LiveReload plugin has been disabled.';
		StatusBarUi.clear();
	}

	public static connected() {
		StatusBarUi.statusbar.text = 'LiveReload client connected.';
		StatusBarUi.clear();
	}

	public static disconnected() {
		StatusBarUi.statusbar.text = 'LiveReload client disconnected.';
		StatusBarUi.clear();
	}

	public static refresh() {
		StatusBarUi.statusbar.text = 'LiveReload refresh from VS Code LiveReload.';
		StatusBarUi.clear();
	}

	private static clear() {
		setTimeout(() => {
			StatusBarUi.statusbar.text = '';
		}, 1800);
	}

	dispose() {
		StatusBarUi.statusbar.dispose();
	}
}