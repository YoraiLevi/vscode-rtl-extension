// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

function decorate() {
	let decoration = vscode.window.createTextEditorDecorationType({
		// @ts-ignore: Unreachable code error
		float: "right",
		width: "300px",
		border: "3px solid #73AD21",
		padding: "10px"
	})
	
	console.log(decoration)
	let editor: vscode.TextEditor;
	if (!vscode.window.activeTextEditor) {
		return;
	}
	editor = vscode.window.activeTextEditor;
	let lines = editor.document.getText().split("\n")

	console.log(editor.document.getText())
	editor.setDecorations(decoration, [new vscode.Range(new vscode.Position(0, 0), new vscode.Position(lines.length-1, lines[lines.length-1].length))])


}


export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-rtl" is now active!');

	if (vscode.window.activeTextEditor.document.languageId == 'markdown') {
		decorate()
	}
	vscode.workspace.onDidChangeTextDocument(e => {
		if (vscode.window.activeTextEditor.document.languageId == 'markdown') {
			decorate()
		}
	});

	vscode.workspace.onDidChangeConfiguration(e => {
		if (vscode.window.activeTextEditor.document.languageId == 'markdown') {
			decorate()
		}
	});

	vscode.window.onDidChangeTextEditorViewColumn(e => {
		if (vscode.window.activeTextEditor.document.languageId == 'markdown') {
			decorate()
		}
	});

	vscode.window.onDidChangeActiveTextEditor(e => {
		if (vscode.window.activeTextEditor.document.languageId == 'markdown') {
			decorate()
		}
	});


	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vscode-rtl.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from vscode.rtl!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
