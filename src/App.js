import './App.css';
import { AppRouter } from './router/AppRouter';
import NavbarMenu from './home/components/NavbarMenu';
import { SideMenu } from './home/components/SideMenu';
import { ChakraProvider } from '@chakra-ui/react';


function App() {
  return (
    <>
    <ChakraProvider/>
      <NavbarMenu/>
      <SideMenu/>
      <AppRouter/>
      <h1>Hola mundo!</h1>
    </>
  );
}

export default App;
