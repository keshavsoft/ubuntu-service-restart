import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { restartService, getServiceLiveStatus, getServiceLogs, isSystemctlAvailable } from "../src/index.js";

describe("ubuntu-service-restart", () => {
    test("detects systemctl availability based on platform", () => {
        const available = isSystemctlAvailable();
        assert.equal(typeof available, "boolean");
    });

    test("simulates restart cleanly when systemctl is not available", () => {
        const res = restartService("test.service");
        assert.equal(res.success, true);
        assert.equal(res.unitName, "test.service");
    });

    test("simulates logs cleanly when systemctl is not available", () => {
        const res = getServiceLogs("test.service", 10);
        assert.equal(res.success, true);
        assert.ok(res.logs.includes("test.service"));
    });
});
