import { render, screen } from "@testing-library/react";
// import App from './App';
import Card from "../src/components/Card/Card";

test("should render h2 element", () => {
  render(<Card />);
  const elemento = screen.getByText(/Weight/i);
  expect(elemento).toBeInTheDocument();
});
