import React from "react";
import 'bootswatch/dist/vapor/bootstrap.css'
import '../custom.css'
import Rotas from "./rotas";
import Navbar from "../components/navbar"
import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.js'


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
