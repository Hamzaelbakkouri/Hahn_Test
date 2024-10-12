import { NavBar } from "./components/Bars/NavBar";
import TicketList from "./components/Tickets/TicketList";

function App() {


  return (
    <div className="App">
      <NavBar />
      <section className="pt-16">
        <TicketList />
      </section>
    </div>
  );
}

export default App;
