# Splitwise on Base

A social-native Mini App for Farcaster users to easily split bills, track shared expenses, and settle payments within groups on the Base blockchain.

## Features

### 🔄 Automated Expense Splitting
- Create groups with friends and family
- Add expenses with customizable categories
- Automatically calculate fair splits between group members
- Support for unequal splits and custom amounts

### 💰 In-App Settlement
- Settle debts directly through the app using Base blockchain
- One-click payments with smart wallet integration
- Real-time transaction tracking and confirmations
- Support for ETH and Base ecosystem tokens

### 📊 Centralized Expense Management
- Track all group expenses in one place
- View detailed expense history and categories
- Monitor individual and group spending patterns
- Export expense reports for record keeping

### 🔔 Settlement Reminders
- Automated reminders for pending settlements
- Push notifications for new expenses and payments
- Balance alerts when amounts are due
- Social features to gently nudge friends

## Technology Stack

- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Blockchain**: Base (Ethereum L2), OnchainKit for wallet integration
- **Mini App**: MiniKit for Farcaster integration
- **Wallet**: Smart wallet with passkey authentication
- **UI/UX**: Mobile-first responsive design optimized for Base App

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- OnchainKit API key
- Base testnet/mainnet access

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/splitwise-on-base.git
cd splitwise-on-base
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your OnchainKit API key to `.env.local`:
```
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Creating a Group
1. Tap "Create Group" on the home screen
2. Enter group name and description
3. Add members by name or wallet address
4. Start adding expenses immediately

### Adding Expenses
1. Select a group from your dashboard
2. Tap "Add Expense" 
3. Enter expense details (title, amount, category)
4. Choose who paid and how to split
5. Save to automatically calculate balances

### Settling Payments
1. View your balance in any group
2. Tap "Settle Up" for amounts owed
3. Confirm payment through smart wallet
4. Transaction is recorded on Base blockchain

### Managing Groups
- View all expenses and settlements in group history
- Check individual member balances
- Export expense reports
- Leave or archive groups when needed

## Architecture

### Component Structure
```
components/
├── Header.tsx              # Navigation header with actions
├── GroupCard.tsx           # Group overview cards
├── ExpenseCard.tsx         # Individual expense display
├── BalanceCard.tsx         # Balance overview component
├── SettlementCard.tsx      # Settlement transaction display
├── CreateGroupModal.tsx    # Group creation form
└── AddExpenseModal.tsx     # Expense addition form
```

### Key Features
- **Real-time Updates**: Live balance calculations as expenses are added
- **Smart Splitting**: Automatic fair split calculations with custom options
- **Blockchain Integration**: Secure settlements using Base smart contracts
- **Social Features**: Share expenses and request payments through Farcaster
- **Mobile Optimized**: Touch-friendly interface designed for mobile use

## Base Mini App Integration

This app is built as a Base Mini App with:
- MiniKit provider for Farcaster integration
- OnchainKit for Base blockchain functionality
- Smart wallet for seamless crypto payments
- Social sharing and discovery features
- Optimized for Base App mobile experience

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- Open an issue on GitHub
- Join our Discord community
- Follow us on Farcaster @splitwise-base

## Roadmap

- [ ] Multi-token support (USDC, other Base tokens)
- [ ] Recurring expense automation
- [ ] Receipt scanning and OCR
- [ ] Advanced analytics and insights
- [ ] Integration with other DeFi protocols
- [ ] Group savings goals and challenges
