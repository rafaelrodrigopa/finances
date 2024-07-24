import React from "react";
import 'bootswatch/dist/flatly/bootstrap.css'
import '../custom.css'
import Rotas from "./rotas";
import Navbar from "../components/navbar"
import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.js'

//import 'primereact/resources/themes/nova-accent/theme.css'//
//import 'primereact/resources/primereact.min.css'
//import 'primeicons/primeicons.css'


import { Dialog } from 'primereact/dialog';

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
