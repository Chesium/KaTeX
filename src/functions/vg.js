import defineFunction, {ordargument} from "../defineFunction";
import buildCommon from "../buildCommon";
import mathMLTree from "../mathMLTree";
import {calculateSize} from "../units";
import {assertNodeType} from "../parseNode";

import * as html from "../buildHTML";
import * as mml from "../buildMathML";

defineFunction({
  type: "vg",
  names: ["\\vg"],
  props: {
      numArgs: 1,
      argTypes: ["original"],
      allowedInText: true,
  },
  handler({parser, funcName}, args) {
      const body = args[0];
      return {
          type: "vg",
          mode: parser.mode,
          body: (ordargument(body): AnyParseNode[]),
      };
  },
  htmlBuilder(group, options) {
      if (group.semisimple) {
          return buildCommon.makeFragment(
              html.buildExpression(group.body, options, false));
      }
      return buildCommon.makeSpan(
          ["vg"], html.buildExpression(group.body, options, true), options);
  },
  mathmlBuilder(group, options) {
      return mml.buildExpressionRow(group.body, options, true);
  },
});