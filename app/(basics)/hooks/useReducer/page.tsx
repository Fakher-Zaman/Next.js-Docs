"use client";

import { Button, Card, Input } from '@nextui-org/react';
import React, { useReducer, useState } from 'react';

enum TodoActionType {
    ADD_TODO = 'ADD_TODO',
    REMOVE_TODO = 'REMOVE_TODO',
    TOGGLE_TODO = 'TOGGLE_TODO',
}

interface Todo {
    id: number;
    text: string;
    isCompleted: boolean;
}

interface TodoState {
    todos: Todo[];
}

interface TodoAction {
    type: TodoActionType;
    payload?: any;
}

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
    switch (action.type) {
        case TodoActionType.ADD_TODO:
            return {
                todos: [
                    ...state.todos,
                    action.payload
                ],
            };
        case TodoActionType.REMOVE_TODO:
            return {
                todos: state.todos.filter(todo => todo.id !== action.payload),
            };
        case TodoActionType.TOGGLE_TODO:
            return {
                todos: state.todos.map(todo =>
                    todo.id === action.payload
                        ? { ...todo, isCompleted: !todo.isCompleted }
                        : todo
                ),
            };
        default:
            return state;
    }
}

const useReducerHook: React.FC = () => {
    const [state, dispatch] = useReducer(todoReducer, { todos: [] });
    const [text, setText] = useState<string>('');

    const handleAddTodo = () => {
        if (text.trim() === '') return;
        dispatch({
            type: TodoActionType.ADD_TODO,
            payload: {
                id: new Date().getTime(),
                text,
                isCompleted: false,
            }
        });
        setText('');
    };

    return (
        <Card className='p-4 max-w-md mx-auto shadow-lg rounded-lg'>
            <h1 className='text-2xl font-bold mb-4'>Todo List</h1>
            <div className='mb-4'>
                <Input
                    type='text'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder='Enter your todo...'
                />
                <Button
                    onClick={handleAddTodo}
                    color='primary'
                    className='w-full mt-2 text-white'
                >
                    Add Todo
                </Button>
            </div>
            <ul>
                {
                    state.todos.map((todo: any) => (
                        <li
                            key={todo.id}
                            className={`p-2 mb-2 flex justify-between items-center rounded-md ${todo.completed ? 'bg-green-100' : 'bg-gray-100'
                                }`}
                        >
                            <span
                                onClick={() => dispatch({ type: TodoActionType.TOGGLE_TODO, payload: todo.id })}
                                className={`cursor-pointer ${todo.isCompleted? 'line-through' : ''
                                    }`}
                            >
                                {todo.text}
                            </span>
                            <Button
                                onClick={() => dispatch({ type: TodoActionType.REMOVE_TODO, payload: todo.id })}
                                color='danger'
                                variant='flat'
                            >
                                Remove
                            </Button>
                        </li>
                    ))
                }
            </ul>
        </Card>
    )
}

export default useReducerHook;