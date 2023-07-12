import { render, screen, fireEvent } from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "../../navigation/AppStack";

// Use this instead with React Native >= 0.64
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

describe("HomeScreen", function () {
  it("should display button for movie app", async () => {
    const component = (
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    );

    render(component);

    const btnName = "Movie App";

    // Using `findBy` query to wait for asynchronous operation to finish
    const testOutput = await screen.findByTestId("weather-btn");

    // Using `toHaveTextContent` matcher from `@testing-library/jest-native` package.
    expect(testOutput).toHaveTextContent(btnName);

    // expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should redirect to the new screen and display button for movie app", async () => {
    const component = (
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    );

    render(component);
    const toClick = await screen.findByTestId("weather-btn");

    fireEvent(toClick, "press");
    const newMovieScreen = await screen.findByText("MoviesScreen");
    // const newBody = await screen.findByText("the number you have chosen is 5");

    expect(newMovieScreen).toBeOnTheScreen();
    // expect(newBody).toBeOnTheScreen();
  });
});
