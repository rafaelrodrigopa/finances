import React from "react";
import 'bootswatch/dist/vapor/bootstrap.css'
import '../custom.css'
import Rotas from "./rotas";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
          <Rotas />
      </div>
    </>
  );
}
export default App;
