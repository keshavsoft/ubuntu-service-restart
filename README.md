# ubuntu-service-restart

> Safe, verified systemctl restarting, live status polling, and journalctl log inspection for Ubuntu systemd services.

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
