import { render, screen, fireEvent } from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../../screens/HomeScreen";

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

describe("HomeScreen", function () {
  it("should display button for movie app", async () => {
    const component = (
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    );

    render(component);

    const btnName = "Movie App";

    // Using `findBy` query to wait for asynchronous operation to finish
    const testOutput = await screen.findByTestId("movie-btn");

    // Using `toHaveTextContent` matcher from `@testing-library/jest-native` package.
    expect(testOutput).toHaveTextContent(btnName);

    // expect(screen.toJSON()).toMatchSnapshot();
  });
});
