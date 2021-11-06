import { Diagnostic } from '@codemirror/lint';
import { EditorView } from '@codemirror/view';
import { compile } from '@robotcoral/lang-karol';

export function lintKarol(view: EditorView): Diagnostic[] {
    try {
        compile(view.state.doc.toString());
        return [];
    } catch(err: any) {
        return [
            {
                from: err.pos.from,
                to: err.pos.to, 
                severity: "error",
                message: err.msg,
            }
        ];
    }
}