import Header from "./components/Header"
import './App.css'
import Balance from "./components/Balance"
import IncomeExpenses from "./components/IncomeExpenses"
import TransectionList from "./components/TransectionList"
import AddTransaction from "./components/AddTransaction"
import { GlobalProvider } from "./components/context/GlobalState"
function App() {
  return (
    <GlobalProvider>
      <Header />
      <div className="container">
        <Balance />
        <IncomeExpenses />
        <TransectionList />
        <AddTransaction />
      </div>
    </GlobalProvider>
  )
}

export default App
