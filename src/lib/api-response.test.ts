import { describe, expect, it } from "vitest";
import { fail, ok } from "./api-response";

describe("api-response", () => {
	it("wraps payloads in a success envelope", () => {
		expect(ok({ id: 1 })).toEqual({ success: true, data: { id: 1 }, error: null });
	});

	it("wraps messages in a failure envelope", () => {
		expect(fail("nope")).toEqual({ success: false, data: null, error: "nope" });
	});
});
