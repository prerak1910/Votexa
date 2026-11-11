import Navbar from './components/Navbar';
import ElectionCard from './components/ElectionCard';

function App() {


  const elections = [
    { id: 1, name: "ACM Elections", status: "Active" },
    { id: 2, name: "Student Council", status: "Upcoming" },
    { id: 3, name: "Sports Committee", status: "Completed" }
];

    return (
        <>
            <Navbar
                title="Votexa"
                buttonText="Login"
            />

            <section>
              <h2>Available Elections</h2>

              {elections.map((election) => (
                  <ElectionCard
                      key={election.id}
                      name={election.name}
                      status={election.status}
                  />
              ))}

          </section>
            <main>
                <h1>Elections, Reimagined.</h1>

                <p>
                    A smarter way to manage and participate
                    in organizational elections.
                </p>

                <button>Get Started</button>
            </main>
        </>
    );

}



export default App
