import { matchString, Tokenizer } from "../tokenizer";

describe("Regexes", () => {
	// it("Should correctly tokenize an empty script", () => {
	// 	const script = "";
	// 	const tokens = matchString(script);
	// 	expect(tokens).toEqual(null);
	// });
	it("Should correctly match an id", () => {
		let token = matchString("someName");
		expect(token[0]).toBe("id");
		expect(token[1]).toBe("someName");

		token = matchString("some_other_name_");
		expect(token[0]).toBe("id");
		expect(token[1]).toBe("some_other_name_");

		token = matchString("_some_other_name_");
		expect(token[0]).toBe("id");
		expect(token[1]).toBe("_some_other_name_");

		token = matchString("some_other_name_123");
		expect(token[0]).toBe("id");
		expect(token[1]).toBe("some_other_name_123");

		expect(() => {
			token = matchString("12some_other_name_123");
			console.log(token);
		}).toThrow();
	});

	it("Should correctly match parentheses", () => {
		let token = matchString("(");
		expect(token[0]).toBe("lpar");
		expect(token[1]).toBe("(");

		token = matchString(")");
		expect(token[0]).toBe("rpar");
		expect(token[1]).toBe(")");
	});

	it("Should correctly match comparison operators", () => {
		let token = matchString("==");
		expect(token[0]).toBe("eq");
		expect(token[1]).toBe("==");

		token = matchString("!=");
		expect(token[0]).toBe("ineq");
		expect(token[1]).toBe("!=");

		token = matchString("<");
		expect(token[0]).toBe("lt");
		expect(token[1]).toBe("<");

		token = matchString(">");
		expect(token[0]).toBe("gt");
		expect(token[1]).toBe(">");

		token = matchString("<=");
		expect(token[0]).toBe("lte");
		expect(token[1]).toBe("<=");

		token = matchString(">=");
		expect(token[0]).toBe("gte");
		expect(token[1]).toBe(">=");
	});

	it("Should correctly match attributions", () => {
		let token = matchString("=");
		expect(token[0]).toBe("attrib");
		expect(token[1]).toBe("=");
	});

	it("Should correctly match numbers", () => {
		let token = matchString("0");
		expect(token[0]).toBe("number");
		expect(token[1]).toBe("0");

		token = matchString("1");
		expect(token[0]).toBe("number");
		expect(token[1]).toBe("1");

		token = matchString("10");
		expect(token[0]).toBe("number");
		expect(token[1]).toBe("10");

		token = matchString("010");
		expect(token[0]).toBe("number");
		expect(token[1]).toBe("010");

		token = matchString("0.0");
		expect(token[0]).toBe("number");
		expect(token[1]).toBe("0.0");

		token = matchString("1.5");
		expect(token[0]).toBe("number");
		expect(token[1]).toBe("1.5");

		token = matchString("1.5000");
		expect(token[0]).toBe("number");
		expect(token[1]).toBe("1.5000");

		token = matchString("001.5000");
		expect(token[0]).toBe("number");
		expect(token[1]).toBe("001.5000");

		token = matchString("1e3");
		expect(token[0]).toBe("number");
		expect(token[1]).toBe("1e3");

		token = matchString("-0");
		expect(token[0]).toBe("number");
		expect(token[1]).toBe("-0");

		token = matchString("-1.5000");
		expect(token[0]).toBe("number");
		expect(token[1]).toBe("-1.5000");
	});
});

// describe("Keywords tokenization", () => {
// 	it("Should correctly tokenize an empty script", () => {
// 		const script = "";
// 		const tokenizer = new Tokenizer(script);
// 		const tokens = tokenizer.run();
// 		expect(tokens).toEqual([]);
// 	});
// 	it("Should correctly tokenize variable names", () => {
// 		const script = "variable1";
// 		const tokenizer = new Tokenizer(script);
// 		const tokens = tokenizer.run();
// 		expect(tokens).toEqual([["id", "variable1"]]);
// 	});
// });
