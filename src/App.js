import "./App.css";
import Admin from "./Components/Admin";
import Customer from "./Components/Customer";
import CutsomerSignUp from "./Components/CustomerSignUp";
import LandingPage from "./Components/LandingPage";
import Login from "./Components/Login";
import ServiceCenterSignUp from "./Components/ServiceCenterSignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomerHistory from "./Components/CustomerHistory";
import CustomerBill from "./Components/CustomerBill";
import RequestedServiceCenter from "./Components/Admin Page/RequestedServiceCenter";
import ServiceCenterHistory from "./Components/ServiceCenter/ServiceCenterHistory";
import ServiceCenterProfile from "./Components/ServiceCenter/ServiceCenterProfile";
import ServiceCenterRequests from "./Components/ServiceCenter/ServiceCenterRequests";
import UpdateServiceStatus from "./Components/ServiceCenter/UpdateServiceStatus";
import BillGeneration from "./Components/ServiceCenter/BillGeneration";
import LandingScreen from "./Components/LandingScreen";
import NavbarAdmin from "./Components/Admin Page/NavbarAdmin";
import HomeContent from "./Components/Admin Page/HomeContent";
import AdminProfile from "./Components/Admin Page/AdminProfile";
import AllBills from "./Components/Admin Page/AllBills";
import CustomerProfiles from "./Components/Admin Page/CustomerProfiles";
import ServiceCenters from "./Components/Admin Page/ServiceCenters";
import ServiceCenterBills from "./Components/ServiceCenter/ServiceCenterBills";

function App() {
  return (
    <div className="App" style={{backgroundColor:"#1b2046", minHeight:"100vh"}}>
      
      <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingScreen />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/customerSignUp" element={<CutsomerSignUp />}></Route>
              <Route path="/serviceCenterSignUp" element={<ServiceCenterSignUp />}></Route>
              <Route path="/admin/:userId" element={<HomeContent />}></Route>
              <Route path="/customer/:userId" element={<Customer />}></Route>
              <Route path="/serviceCenter/:userId" element={<ServiceCenterProfile />}></Route>
              <Route path="/profileCustomer/:userId" element={<Customer />}></Route>
              <Route path="/serviceHistory/:userId" element={<CustomerHistory />}></Route>
              <Route path="/customerBill/:userId" element={<CustomerBill />}></Route>
              <Route path="/pendingRequests/:userId" element={<RequestedServiceCenter />}></Route>
              <Route path="/serviceCenterHistory/:userId" element={<ServiceCenterHistory />}></Route>
              <Route path="/profileServiceCenter/:userId" element={<ServiceCenterProfile />}></Route>
              <Route path="/serviceRequests/:userId" element={<ServiceCenterRequests />}></Route>
              <Route path="/serviceUpdateStatus/:userId" element={<UpdateServiceStatus />}></Route>
              <Route path="/generateBill/:userId/:serviceId/:faultInfo/:customerId" element={<BillGeneration />}></Route>
              <Route path="/adminprofilePage/:userId" element={<AdminProfile />}></Route>
              <Route path="/adminBills/:userId" element={<AllBills />}></Route>
              <Route path="/centerRequets/:userId" element={<RequestedServiceCenter />}></Route>
              <Route path="/adminCustomers/:userId" element={<CustomerProfiles />}></Route>
              <Route path="/adminServiceCenters/:userId" element={<ServiceCenters />}></Route>
              <Route path="/serviceCenterBills/:userId" element={<ServiceCenterBills />}></Route>
            </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
