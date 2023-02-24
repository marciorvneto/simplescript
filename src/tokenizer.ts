type ContentType =
	| "whitesp"
	| "keyword"
	| "id"
	| "lpar"
	| "rpar"
	| "eq"
	| "ineq"
	| "lt"
	| "gt"
	| "lte"
	| "gte"
	| "attrib"
	| "number";
type Token = [ContentType, string];

const REGEXES: [ContentType, RegExp][] = [
	["whitesp", /^\s+/],
	// ["keyword", /^/],
	["lpar", /^\(/],
	["rpar", /^\)/],
	["eq", /^==/],
	["lte", /^<=/],
	["gte", /^>=/],
	["lt", /^</],
	["gt", /^>/],
	["ineq", /^!=/],
	["attrib", /^=/],
	["number", /^[+-]?[0-9]+(\.[0-9]+)?(e[+-]?[0-9]+)?(\s+)/],
	["id", /^[a-zA-Z_][a-zA-Z0-9_]+/],
];

export const matchString = (substring: string): Token => {
	for (let [contentType, regexp] of REGEXES) {
		const matches = substring.match(regexp);
		if (matches) {
			return [contentType, matches[0]];
		}
	}
	throw new Error("Could not match " + substring.slice(0, 10));
};

export class Tokenizer {
	private cursor: number;
	constructor(private content: string) {
		this.cursor = 0;
	}

	run(): Token[] {
		const remainingString = this.content.slice(this.cursor);
		const tokens: Token[] = [];

		console.log(this.content.length);

		while (this.cursor < this.content.length) {
			matchString(remainingString);
			break;
		}

		return tokens;
	}
}
