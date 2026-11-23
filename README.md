# ubuntu-service-restart

[![npm version](https://img.shields.io/badge/npm-v1.0.0-orange.svg)](https://www.npmjs.com/package/ubuntu-service-restart)
[![Docs](https://img.shields.io/badge/docs-GitHub_Pages-sky.svg)](https://keshavsoft.github.io/ubuntu-service-docs/restart/)
[![Suite](https://img.shields.io/badge/suite-ubuntu--service-orange.svg)](https://keshavsoft.github.io/ubuntu-service-docs/)
[![GitHub](https://img.shields.io/badge/github-keshavsoft%2Fubuntu--service--restart-181717.svg)](https://github.com/keshavsoft/ubuntu-service-restart)

> Safe, verified systemctl restarting, live status polling, and journalctl log inspection for Ubuntu systemd services.

---

## 🌐 Documentation & Links

- **Dedicated Documentation:** [https://keshavsoft.github.io/ubuntu-service-docs/restart/](https://keshavsoft.github.io/ubuntu-service-docs/restart/)
- **Full Suite Hub:** [https://keshavsoft.github.io/ubuntu-service-docs/](https://keshavsoft.github.io/ubuntu-service-docs/)
- **npm Package:** [https://www.npmjs.com/package/ubuntu-service-restart](https://www.npmjs.com/package/ubuntu-service-restart)
- **Sister Packages:**
  - `ubuntu-service`: [npm](https://www.npmjs.com/package/ubuntu-service) | [docs](https://keshavsoft.github.io/ubuntu-service-docs/service/)
  - `ubuntu-service-detect`: [npm](https://www.npmjs.com/package/ubuntu-service-detect) | [docs](https://keshavsoft.github.io/ubuntu-service-docs/detect/)

---

## 🎯 Purpose

`ubuntu-service-restart` is the dedicated lifecycle & execution engine for Linux systemd services. It decouples execution and side-effects from discovery logic:
- Safely runs `systemctl restart <unit>` with optional `daemon-reload`.
- Verifies post-restart health status (`systemctl is-active`).
- Inspects live unit state (`activeState`, `enabled`).
- Retrieves tail logs cleanly via `journalctl -u <unit> -n <lines> --no-pager`.
- Gracefully handles non-Linux / local environments via safe simulation.

---

## 🚀 Installation & Usage

```bash
npm install ubuntu-service-restart
```

```javascript
import { restartService, getServiceLiveStatus, getServiceLogs } from "ubuntu-service-restart";

// 1. Check live status
const status = getServiceLiveStatus("appointment.keshavsoft.com.service");
console.log(status); // { available: true, activeState: 'active', enabled: true }

// 2. Safe restart with verification
const result = restartService("appointment.keshavsoft.com.service");
console.log(result.message); // Service restarted successfully.

// 3. View tail logs
const logs = getServiceLogs("appointment.keshavsoft.com.service", 25);
console.log(logs.logs);
```

---

## 🧪 Tests

```bash
npm test
```
