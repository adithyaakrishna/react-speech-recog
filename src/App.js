import './App.css';
import ChatBot from './components/chatbot/ChatBot';
import ExampleDBPedia from './components/RHSearch/RHSearch';
import SimpleForm from './components/SimpleForm/SimpleForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <ChatBot></ChatBot> */}
        <SimpleForm></SimpleForm>
        <ExampleDBPedia></ExampleDBPedia>
      </header>
    </div>
  );
}

export default App;
