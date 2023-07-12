import { render, screen, fireEvent } from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";
import App from "../../App";

describe("calculate", function () {
  it("examples of some things", async () => {
    const btnName = "Open up App.tsx to start working on your app!";

    render(<App />);

    // Using `findBy` query to wait for asynchronous operation to finish
    const testOutput = await screen.findByTestId("app-text");

    // Using `toHaveTextContent` matcher from `@testing-library/jest-native` package.
    expect(testOutput).toHaveTextContent(btnName);

    // expect(screen.toJSON()).toMatchSnapshot();
  });
});
