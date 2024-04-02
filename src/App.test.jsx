import App from './App';
import { test, expect } from "vitest";
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

test("clear all todos", () => {
    
    render(<App />);
  
    const desc = screen.getByPlaceholderText("Description");
    fireEvent.change(desc, { target: { value: "Vietä Juhannusta" } });
    const priority = screen.getByPlaceholderText("Priority");
    fireEvent.change(priority, { target: { value: "High" } });
    const addButton = screen.getByText("Add");
    fireEvent.click(addButton);
  
    const todoText = screen.getByText(/Vietä Juhannusta/i);
    expect(todoText).toBeInTheDocument();
    const priorityText = screen.getByText(/High/i);
    expect(priorityText).toBeInTheDocument();
  
    const clearButton = screen.getByText("Clear");
    fireEvent.click(clearButton);
  
    
    expect(todoText, priorityText).not.toBeInTheDocument();
  });