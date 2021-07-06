import 'bulma/css/bulma.min.css';
import TodoApp from './Components/TodoApp';

export default function App() {
  return (
    <div className="columns is-centered">
      <div className="column is-6-desktop is-8-tablet">
        <div className="section mb-0 pb-0">
          <h1 className="title">React ToDo</h1>
          <p className="subtitle">The power of procastinate!</p>
        </div>
        <TodoApp />
      </div>
    </div>
  );
}
