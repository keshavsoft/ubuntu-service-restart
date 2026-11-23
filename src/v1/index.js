import { execSync } from "node:child_process";

export function isSystemctlAvailable() {
    if (process.platform !== "linux") return false;
    try {
        execSync("which systemctl 2>/dev/null", { stdio: "ignore" });
        return true;
    } catch {
        return false;
    }
}

export function getServiceLiveStatus(unitName) {
    if (!isSystemctlAvailable()) {
        return {
            available: false,
            activeState: "unknown",
            subState: "unknown",
            description: "systemctl unavailable (non-linux or missing)"
        };
    }

    try {
        const activeState = execSync(`systemctl is-active ${unitName} 2>/dev/null`, {
            encoding: "utf-8",
            timeout: 3000
        }).trim();

        const isEnabled = execSync(`systemctl is-enabled ${unitName} 2>/dev/null`, {
            encoding: "utf-8",
            timeout: 3000
        }).trim();

        return {
            available: true,
            activeState: activeState || "inactive",
            enabled: isEnabled === "enabled"
        };
    } catch (err) {
        return {
            available: true,
            activeState: "inactive",
            enabled: false,
            error: err.message
        };
    }
}

export function restartService(unitName, options = {}) {
    if (!unitName) {
        throw new Error("Unit name is required to restart service");
    }

    if (!isSystemctlAvailable()) {
        return {
            success: true,
            simulated: true,
            unitName,
            message: `[Simulated] systemctl restart ${unitName}`
        };
    }

    try {
        if (options.daemonReload) {
            execSync("systemctl daemon-reload", { stdio: "inherit", timeout: 10000 });
        }

        execSync(`systemctl restart ${unitName}`, {
            stdio: "inherit",
            timeout: 15000
        });

        const postStatus = getServiceLiveStatus(unitName);

        return {
            success: postStatus.activeState === "active",
            unitName,
            status: postStatus.activeState,
            message: `Service ${unitName} restarted successfully.`
        };
    } catch (err) {
        return {
            success: false,
            unitName,
            error: err.message,
            message: `Failed to restart service ${unitName}.`
        };
    }
}

export function getServiceLogs(unitName, lines = 25) {
    if (!unitName) return { success: false, error: "Unit name required" };

    if (!isSystemctlAvailable()) {
        return {
            success: true,
            simulated: true,
            unitName,
            logs: `[Simulated] journalctl -u ${unitName} -n ${lines} --no-pager`
        };
    }

    try {
        const logs = execSync(`journalctl -u ${unitName} -n ${lines} --no-pager`, {
            encoding: "utf-8",
            timeout: 5000
        });
        return {
            success: true,
            unitName,
            logs: logs.trim()
        };
    } catch (err) {
        return {
            success: false,
            unitName,
            error: err.message
        };
    }
}

export default restartService;
