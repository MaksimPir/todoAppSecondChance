import { FC } from 'react';
import './App.css';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList/TodoList';
import { Header } from './components/Header/Header';
import FilteringButtons from './components/FilteringButtons/FilteringButtons';
import { Provider } from 'react-redux';
import { store } from './store';

const App:FC=()=> {
  return (
    <Provider store={store}>
      <Header/>
      <main>
        <section>
          <div className="container pt-4">
            <TodoForm/>
            <h2 className='pt-3'>New Todos</h2> 
            <FilteringButtons/>
            <TodoList/>
          </div>
        </section>
      </main>
    </Provider>
  );
}

export default App;
