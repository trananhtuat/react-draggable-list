import './App.css';

import { listData } from './assets/listData'

import DraggableList from './components/list/DraggableList';
import Card from './components/card/Card';

function App() {
    return (
        <>
            <h1 className="header">
                React drag and drop list
            </h1>
            <DraggableList
                data={listData}
                renderItemContent={(item) => LessonCard(item)}
            />
        </>
    );
}

const LessonCard = item => <Card item={item}/>

export default App;
