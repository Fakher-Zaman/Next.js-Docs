"use client";

import { Button, Card, Input } from '@nextui-org/react';
import React, { useReducer, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { FaCheck, FaPlus } from 'react-icons/fa';

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
        <Card className='p-4 min-w-[500px] mx-auto shadow-lg rounded-lg'>
            <h2 className='text-2xl mb-4'>Todo List</h2>
            <div className='mb-4 flex gap-2 items-center'>
                <Input
                    type='text'
                    variant='underlined'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder='Enter your todo...'
                />
                <Button
                    onClick={handleAddTodo}
                    color='primary'
                    className='text-white'
                >
                    <FaPlus />
                </Button>
            </div>
            <ul>
                {
                    state.todos.map((todo: any) => (
                        <li
                            key={todo.id}
                            className={`py-2 px-4 mb-2 flex justify-between items-center rounded-md ${todo.isCompleted ? 'bg-default-100' : 'bg-default-200'}`}
                        >
                            <span
                                onClick={() => dispatch({ type: TodoActionType.TOGGLE_TODO, payload: todo.id })}
                                className={`cursor-pointer ${todo.isCompleted ? 'line-through' : ''}`}
                            >
                                {todo.text}
                            </span>
                            <div className='flex flex-row justify-center items-center gap-2'>
                                <span
                                    onClick={() => dispatch({ type: TodoActionType.TOGGLE_TODO, payload: todo.id })}
                                    className='text-primary cursor-pointer text-2xl'
                                >
                                    <FaCheck />
                                </span>
                                <span
                                    onClick={() => dispatch({ type: TodoActionType.REMOVE_TODO, payload: todo.id })}
                                    className='text-danger cursor-pointer text-2xl'
                                >
                                    <AiFillDelete />
                                </span>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </Card>
    )
}

export default useReducerHook;