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

export function genTree(): AnyParseNode[] {
    return [
        {mode: "math", text: "x", type: "mathord"},
        {dimension: {number: 1, unit: "em"}, mode: "math", type: "dspace"},
    ];
}

export function renderTest(tree: AnyParseNode[], baseNode: Node) {
    const options = {displayMode: true, throwOnError: true, trust: true};
    const settings = new Settings(options);
    const htmlNode = buildHTML(tree, optionsFromSettings(settings));
    const katexNode = buildCommon.makeSpan(
        ["katex", "katex-display"],
        [htmlNode],
    );
    baseNode.appendChild(katexNode.toNode());
}

export function dragTest(): void {
    const container = document.getElementById("math");
    renderTest(genTree(), container);
}
