import {render, screen, fireEvent } from "@testing-library/react"
import App from "../App"
import '@testing-library/jest-dom'

describe('tests',()=>{
    test('test clear completed',()=>{
        render(<App/>)
        const btnCreate=screen.getByText('Create')
        expect(btnCreate).toBeInTheDocument()
        const inputCreate=screen.getByTestId('createInput')
        expect(inputCreate).toBeInTheDocument()
        fireEvent.input(inputCreate,{target:{value:'Test'}})
        fireEvent.click(btnCreate)
        fireEvent.input(inputCreate,{target:{value:'Test2'}})
        fireEvent.click(btnCreate)
        const btnToDone=screen.getAllByText('Done')
        fireEvent.click(btnToDone[0])
        const btnClearCompleted=screen.getByTestId('clearCompleted')
        fireEvent.click(btnClearCompleted)
        const doneTodos=screen.getAllByTestId('titleSpan')
        doneTodos.forEach((el)=>{
            expect(el).not.toHaveStyle('text-decoration: line-through')
        })
        const btnToDelete=screen.getByText('Delete')
        fireEvent.click(btnToDelete)
        screen.debug()
    }),
    test('test update todo',()=>{
        render(<App/>)
        const btnCreate=screen.getByText('Create')
        expect(btnCreate).toBeInTheDocument()
        const inputCreate=screen.getByTestId('createInput')
        expect(inputCreate).toBeInTheDocument()
        fireEvent.input(inputCreate,{target:{value:'Test 3'}})
        fireEvent.click(btnCreate)
        const titleTodo=screen.getByTestId('titleSpan')
        expect(titleTodo).toHaveTextContent(/test 3/i)
        const btnUpdate=screen.getByText('Update')
        fireEvent.click(btnUpdate)
        const titleInput=screen.getByTestId('titleInput')
        expect(titleInput).toBeInTheDocument()
        fireEvent.input(titleInput,{target:{value:'Change test'}})
        fireEvent.keyDown(titleInput,{key: 'Enter', code: 'Enter', charCode: 13})
        const newTitle=screen.getByText(/change test/i)
        expect(newTitle).toBeInTheDocument()
        screen.debug()
    })
})
