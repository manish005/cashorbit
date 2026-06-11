import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  app.use(express.json());

  // Define data directory and database paths
  const DATA_DIR = path.join(__dirname, 'data');
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
  }

  const TX_FILE = path.join(DATA_DIR, 'transactions.json');
  const BUDGET_FILE = path.join(DATA_DIR, 'budgets.json');
  const INV_FILE = path.join(DATA_DIR, 'investments.json');
  const NOTIF_FILE = path.join(DATA_DIR, 'notifications.json');

  // Seed default data if files do not exist
  const seedDefaultData = () => {
    if (!fs.existsSync(TX_FILE) || !fs.existsSync(BUDGET_FILE) || !fs.existsSync(INV_FILE)) {
      const EXCHANGE_RATE = 83.50;
      const toUSD = (inr: number) => parseFloat((inr / EXCHANGE_RATE).toFixed(2));

      const txs: any[] = [];
      const invs: any[] = [];

      let txIdCounter = 1;
      function addTx(amountINR: number, dateStr: string, description: string, category: string, type: string) {
        txs.push({
          id: `tx_${txIdCounter++}`,
          amount: toUSD(amountINR),
          date: dateStr,
          description,
          category,
          type
        });
      }

      let invIdCounter = 1;
      function addInv(name: string, amountINR: number, type: string, dateStr: string) {
        invs.push({
          id: `inv_${invIdCounter++}`,
          name,
          amount: toUSD(amountINR),
          type,
          date: dateStr.split('T')[0]
        });
      }

      // Loop months: 0 = Jan, 1 = Feb, 2 = Mar, 3 = Apr, 4 = May, 5 = Jun
      for (let month = 0; month <= 5; month++) {
        const year = 2026;
        const monthStr = String(month + 1).padStart(2, '0');

        // Salary: 1st of month at 9:00 AM
        const salaryDate = `${year}-${monthStr}-01T09:00:00`;
        addTx(110000, salaryDate, "Monthly Salary Credit", "Salary", "income");

        // Rent: 1st of month at 10:30 AM
        const rentDate = `${year}-${monthStr}-01T10:30:00`;
        addTx(22500, rentDate, "Apartment Rent Payment", "Housing", "expense");

        // Savings: 2nd of month at 9:15 AM
        const savingsDate = `${year}-${monthStr}-02T09:15:00`;
        addTx(30000, savingsDate, "Emergency Fund Savings Transfer", "Emergency Fund", "transfer");

        // Travel Savings: 2nd of month at 10:45 AM
        const travelDate = `${year}-${monthStr}-02T10:45:00`;
        addTx(10000, travelDate, "Yearly Travel Savings Transfer", "Travel", "transfer");

        // Mutual Funds & Equity Investments: 5th of month
        const mfDate = `${year}-${monthStr}-05T11:00:00`;
        addTx(5000, mfDate, "Investment: Mutual Fund SIP", "Investment", "transfer");
        addInv("Mutual Funds SIP", 5000, "Bonds", mfDate);

        const equityDate = `${year}-${monthStr}-05T14:30:00`;
        addTx(10000, equityDate, "Investment: Equity Portfolio", "Investment", "transfer");
        addInv("Equity Portfolio", 10000, "Stock", equityDate);

        // WiFi: Jan 5th only (10K PA)
        if (month === 0) {
          const wifiDate = `${year}-${monthStr}-05T16:00:00`;
          addTx(10000, wifiDate, "Annual WiFi Subscription (10K PA)", "Utilities", "expense");
        }

        // Electricity & Gas: 10th of month at 15:15 PM
        const utilDate = `${year}-${monthStr}-10T15:15:00`;
        addTx(2500, utilDate, "Electricity & Gas Bill Payment", "Utilities", "expense");

        // Weekly expenses: Saturdays and Sundays of the month
        const numDays = new Date(year, month + 1, 0).getDate();
        for (let day = 1; day <= numDays; day++) {
          const date = new Date(year, month, day);
          // Don't generate past June 12, 2026
          if (date > new Date(2026, 5, 12)) {
            break;
          }
          const dayStr = String(day).padStart(2, '0');
          const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday

          if (dayOfWeek === 6) { // Saturday
            const groceryDate = `${year}-${monthStr}-${dayStr}T11:30:00`;
            addTx(2500, groceryDate, "Weekly Groceries", "Food", "expense");
          } else if (dayOfWeek === 0) { // Sunday
            const movieDate = `${year}-${monthStr}-${dayStr}T18:45:00`;
            addTx(1250, movieDate, "Movies & Swiggy/Instamart Delivery", "Entertainment", "expense");

            const petrolDate = `${year}-${monthStr}-${dayStr}T12:15:00`;
            addTx(1250, petrolDate, "Petrol & Vegetables Bill", "Transport", "expense");
          }
        }
      }

      const budgets = [
        { id: "b1", category: "Housing", limit: toUSD(22500) },
        { id: "b2", category: "Food", limit: toUSD(15000) },
        { id: "b3", category: "Utilities", limit: toUSD(5000) },
        { id: "b4", category: "Transport", limit: toUSD(5000) },
        { id: "b5", category: "Entertainment", limit: toUSD(5000) },
        { id: "b6", category: "Travel", limit: toUSD(10000) }
      ];

      if (!fs.existsSync(TX_FILE)) {
        fs.writeFileSync(TX_FILE, JSON.stringify(txs, null, 2));
      }
      if (!fs.existsSync(INV_FILE)) {
        fs.writeFileSync(INV_FILE, JSON.stringify(invs, null, 2));
      }
      if (!fs.existsSync(BUDGET_FILE)) {
        fs.writeFileSync(BUDGET_FILE, JSON.stringify(budgets, null, 2));
      }
      if (!fs.existsSync(NOTIF_FILE)) {
        const notifications = [
          {
            id: "n1",
            title: "Budget Alert",
            message: "You have reached 80% of your Food budget for this month.",
            type: "warning",
            time: "2 hours ago",
            read: false
          },
          {
            id: "n2",
            title: "Salary Received",
            message: "Your ₹110,000 salary was added to Main Checking.",
            type: "success",
            time: "Yesterday",
            read: false
          }
        ];
        fs.writeFileSync(NOTIF_FILE, JSON.stringify(notifications, null, 2));
      }
    }
  };

  seedDefaultData();

  // Read/write helpers
  const readJson = (file: string) => {
    try {
      return JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch (e) {
      return [];
    }
  };

  const writeJson = (file: string, data: any) => {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
  };

  // API Endpoints
  // Transactions
  app.get('/api/transactions', (req, res) => {
    res.json(readJson(TX_FILE));
  });

  app.post('/api/transactions', (req, res) => {
    const list = readJson(TX_FILE);
    const item = { ...req.body, id: req.body.id || crypto.randomUUID() };
    list.push(item);
    writeJson(TX_FILE, list);
    res.json(item);
  });

  app.post('/api/transactions/batch', (req, res) => {
    const list = readJson(TX_FILE);
    const items = req.body.map((item: any) => ({
      ...item,
      id: item.id || crypto.randomUUID()
    }));
    const newList = [...list, ...items];
    writeJson(TX_FILE, newList);
    res.json({ success: true, count: items.length });
  });

  // Budgets
  app.get('/api/budgets', (req, res) => {
    res.json(readJson(BUDGET_FILE));
  });

  app.post('/api/budgets', (req, res) => {
    const list = readJson(BUDGET_FILE);
    const item = { ...req.body, id: req.body.id || crypto.randomUUID() };
    const idx = list.findIndex((b: any) => b.category === item.category);
    if (idx >= 0) {
      list[idx] = { ...list[idx], limit: list[idx].limit + item.limit };
    } else {
      list.push(item);
    }
    writeJson(BUDGET_FILE, list);
    res.json(item);
  });

  // Investments
  app.get('/api/investments', (req, res) => {
    res.json(readJson(INV_FILE));
  });

  app.post('/api/investments', (req, res) => {
    const list = readJson(INV_FILE);
    const item = { ...req.body, id: req.body.id || crypto.randomUUID() };
    list.push(item);
    writeJson(INV_FILE, list);
    res.json(item);
  });

  // Notifications
  app.get('/api/notifications', (req, res) => {
    res.json(readJson(NOTIF_FILE));
  });

  app.post('/api/notifications/read-all', (req, res) => {
    const list = readJson(NOTIF_FILE);
    list.forEach((n: any) => n.read = true);
    writeJson(NOTIF_FILE, list);
    res.json({ success: true });
  });

  app.post('/api/notifications/delete', (req, res) => {
    const { id } = req.body;
    let list = readJson(NOTIF_FILE);
    list = list.filter((n: any) => n.id !== id);
    writeJson(NOTIF_FILE, list);
    res.json({ success: true });
  });

  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  // Use Vite's connect instance as middleware
  app.use(vite.middlewares);

  const port = 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
}

startServer();
