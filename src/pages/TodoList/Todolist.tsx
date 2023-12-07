import React, { FC, ReactElement, useCallback, useEffect, useReducer,useState } from "react";
import './index.less'
import Card from '../../components/Card/Card'
import AddForm from "../../components/AddForm/AddForm";
import { todoReducer } from "../../redux";
import {ITodo,ITodoList,ACTION_TYPE} from '../../types'

function initList(initTodoList:ITodo[]):ITodoList{
  return {
    todoList:initTodoList
  }
}

const TodoList:FC = ():ReactElement => {
  const [showAddCard,setShowAddCard] = useState<boolean>(false);
  const [state,dispatch] = useReducer(todoReducer,[],initList)
  const toggleAdd = () => {
    setShowAddCard(!showAddCard)
  }
  const addTodo = useCallback((todo:ITodo) => {
    console.log(todo)
      dispatch({
          type:ACTION_TYPE.ADD_TODO,
          payload: todo
      })
  },[])
  const removeTodo = useCallback((id:number)=>{
      dispatch({
          type: ACTION_TYPE.REMOVE_TODO,
          payload: id
      })
  },[])
  const toggleTodo = useCallback((id:number)=>{
      dispatch({
          type: ACTION_TYPE.TOGGLE_TODO,
          payload: id
      })
  },[])

  const handleScroll = (e:any) => {
    console.log("e : ",e)
  }

  return (
    <>
      <div className='wrapper' onScroll={handleScroll}>
        <div className="cover_head"></div>
        <div className='title'>Daily Todo</div>
        <div className='container'>
          {
              state.todoList && state.todoList.map((todo:ITodo)=>{
                return(
                    <Card
                        key={todo.id} 
                        todo={todo}
                        removeTodo={removeTodo}
                        toggleTodo={toggleTodo}
                    />
                )
            })
          }
          <div className="bottom_bg"></div>
        </div>
      </div>
      {
        showAddCard?<div className="cover">
          <AddForm 
              addTodo={addTodo}
              todoList={state.todoList}
              setShowAddCard={setShowAddCard}/>
        </div>: 
        <div className="bottom">
          <svg onClick={toggleAdd} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 14V26M26 20H14M38 20C38 22.3638 37.5344 24.7044 36.6298 26.8883C35.7252 29.0722 34.3994 31.0565 32.7279 32.7279C31.0565 34.3994 29.0722 35.7252 26.8883 36.6298C24.7044 37.5344 22.3638 38 20 38C17.6362 38 15.2956 37.5344 13.1117 36.6298C10.9278 35.7252 8.94353 34.3994 7.27208 32.7279C5.60062 31.0565 4.27475 29.0722 3.37017 26.8883C2.46558 24.7044 2 22.3638 2 20C2 15.2261 3.89642 10.6477 7.27208 7.27208C10.6477 3.89642 15.2261 2 20 2C24.7739 2 29.3523 3.89642 32.7279 7.27208C36.1036 10.6477 38 15.2261 38 20Z" stroke="#E2E8F0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      }
    </>
  )
}

export default TodoList