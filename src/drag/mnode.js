import buildHTML from "../buildHTML";
import buildMathML from "../buildMathML";
import buildCommon from "../buildCommon";
import Options from "../Options";
import Settings from "../Settings";
import Style from "../Style";
import {optionsFromSettings} from "../buildTree";
import parseTree from "../parseTree";

import type {AnyParseNode} from "../parseNode";
import type {DomSpan} from "../domTree";

export class mnode {
    children: mnode[];
    parent: mnode | null;
    katexNode: AnyParseNode[];
    constructor(){
        
    }

    render(baseNode: Node) {
        const options = {displayMode: true, throwOnError: true, trust: true};
        const settings = new Settings(options);
        const htmlNode = buildHTML(this.katexNode, optionsFromSettings(settings));
        const katexNode = buildCommon.makeSpan(
            ["katex", "katex-display"],
            [htmlNode],
        );
        baseNode.appendChild(katexNode.toNode());
    }
}

class mnode_Variable extends mnode {
    name:string;
    constructor(){
        super();
    }
}