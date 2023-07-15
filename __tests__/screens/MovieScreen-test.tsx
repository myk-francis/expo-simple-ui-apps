import { render, screen, fireEvent, act } from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "../../navigation/AppStack";
import MoviesScreen from "../../screens/MoviesScreen";

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

jest.mock("@expo/vector-icons/FontAwesome", () => "FontAwesome");
jest.mock("@expo/vector-icons/AntDesign", () => "AntDesign");
jest.mock("@expo/vector-icons/Feather", () => "Feather");
jest.mock("expo-linear-gradient", () => "LinearGradient");

describe("MovieScreen", function () {
  it("should display button for movie app", async () => {
    const component = (
      <NavigationContainer>
        <MoviesScreen />
      </NavigationContainer>
    );

    render(component);

    // const toClick = await screen.findByTestId("movie-btn");
    // fireEvent(toClick, "press");

    const menuBtn = await screen.getByTestId("menu-btn");
    expect(menuBtn).toBeOnTheScreen();

    const searchBtn = await screen.getByTestId("search-btn");
    expect(searchBtn).toBeOnTheScreen();

    const movieTitle = await screen.getByTestId("movie-title");
    expect(movieTitle).toHaveTextContent("Movies");

    // expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should redirect to the new screen and display button for movie app", async () => {
    const component = (
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    );

    // expect(newBody).toBeOnTheScreen();
  });
});
